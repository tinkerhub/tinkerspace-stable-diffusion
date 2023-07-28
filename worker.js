require('dotenv').config()
const fs = require("fs");
const Replicate = require("replicate");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");
const { firestore } = require('firebase-admin');

const replicateToken = process.env.REPLICATE_API_TOKEN;

const TIME_TO_SHOW_AN_IMAGE_MS = 15 * 1000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

var db = admin.database();
var queueRef = db.ref("queue");
var readyRef = db.ref("ready")
var completedRef = db.ref("completed");
const configRef = db.ref("config")
// Read all values where status is pending
queueRef.orderByChild("status")
    .equalTo("pending")
    .on("value", function (snapshot) {
        // Set status to processing and initiate generation
        console.log(`Got ${snapshot.numChildren()} to process`);
        snapshot.forEach(async function (childSnapshot) {
            configRef.child("totalCount").set(admin.database.ServerValue.increment(1));
            childSnapshot.ref.update({ status: "processing", processing_started_at: Date.now() });
            const url = await generateImage(childSnapshot.val().text);

            if (!url) {
                // If it fails, just remove the entry
                childSnapshot.ref.remove();
                return;
            }

            childSnapshot.ref.update({ status: "ready", processing_completed_at: Date.now() });
            await moveToReady(childSnapshot,url);
        });
    });

queueRef.orderByChild("status")
    .equalTo("processing")
    .on("value", function (snapshot) {
        const currentTime = Date.now();
        const timeLimit = 15 * 60 * 1000; // 15 minutes in milliseconds

        snapshot.forEach(function (childSnapshot) {
            const processing_start_at = childSnapshot.val().processing_started_at;
            if (currentTime - processing_start_at > timeLimit) {
                // Remove the record if processing started more than 15 minutes ago
                childSnapshot.ref.remove();
            }
        });
    });

async function moveToReady(newEntry,url){
    await readyRef.push({
        ...newEntry.val(),
        keyInQueue: newEntry.key,
        status: "ready",
        url,
        completed_at: Date.now() // Do not use server timestamp here, because that will cause on("value") to be called multiple times for the same entry
    })
}
    
readyRef.orderByChild("completed_at")
    .limitToFirst(1)
    .on("value",function(snapshot){
        if(!snapshot.exists()) return;
        snapshot.forEach(function(childSnapshot){
            moveToCompleted(childSnapshot)
            setTimeout(function(){
                childSnapshot.ref.remove()
            },TIME_TO_SHOW_AN_IMAGE_MS)
        })
    });

async function moveToCompleted(newEntry){
    const refToEntryInQueue = newEntry.val().keyInQueue
    if(refToEntryInQueue){
        queueRef.child(refToEntryInQueue).remove()
    }
    completedRef.push({
        ...newEntry.val(),
        status: "completed",
    })
}

async function generateImage(prompt) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });

    // https://replicate.com/stability-ai/sdxl
    const modelParameters = {
        prompt,
    };

    console.log("Generating image...");

    let imageUrl;

    try {
        const result = await replicate.run(
            "stability-ai/sdxl:2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2",
            {
              input: modelParameters
            }
        );

        // Output comes as an image URL as the first result in an array
        if (result && result[0]) {
            imageUrl = result[0];
        } else {
            console.error("No image generated");
            return null;
        }
    } catch (e) {
        console.error("Error generating image", e);
        return null;
    }

    if (imageUrl) {
        // Download the file from this URL and upload to Firebase Storage
        const result = await axios.get(imageUrl, {
            responseType: "arraybuffer",
        });

        // Upload file to Firebase Storage
        const bucket = admin.storage().bucket();
        const filename = `${uuidv4()}.png`;
        const file = bucket.file(filename);

        const buffer = Buffer.from(result.data, "binary");

        // Set the image as public and get public path
        await file.save(buffer, {
            metadata: {
                contentType: "image/png",
                cacheControl: "public, max-age=86400",
            },
            public: true,
        });

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        console.log("Image generated and uploaded", publicUrl);

        return publicUrl;
    } else {
        console.error("No image generated");
        return null;
    }
}