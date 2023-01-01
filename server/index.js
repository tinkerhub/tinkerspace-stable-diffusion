const fs = require("fs");
const banana = require("@banana-dev/banana-dev");
const { v4: uuidv4 } = require("uuid");

var admin = require("firebase-admin");
var serviceAccount = require("./service-account.json");

const apiKey = "75ee3281-c789-4052-81a0-3362fd2d5aae";
const modelKey = "45f73f92-132a-4fb3-ae91-4fb535610f02";
const TIME_TO_SHOW_AN_IMAGE_MS = 15 * 1000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        "https://tinkerspace-stable-diffusion-default-rtdb.asia-southeast1.firebasedatabase.app",
    storageBucket: "tinkerspace-stable-diffusion.appspot.com",
});

var db = admin.database();
var ref = db.ref("_queue");

// Read all values where status is pending
ref.orderByChild("status")
    .equalTo("pending")
    .on("value", function (snapshot) {
        // Set status to processing and initiate generation
        snapshot.forEach(async function (childSnapshot) {
            childSnapshot.ref.update({ status: "processing" });
            const url = await generateImage(childSnapshot.val().text);
            moveToProcessed(childSnapshot,url)
        });
    });

async function moveToProcessed(newEntry,url){
    await newEntry.ref.update({
        status: "processed",
        url,
        completed_at: admin.database.ServerValue.TIMESTAMP
    })
    const snapshot = await newEntry.ref.once('value')
    updateExpiryAt(snapshot)
}

async function updateExpiryAt(newEntry) {
    const newEntryCompletedTime = newEntry.val().completed_at;
  
    const snapshot = await ref.orderByChild("expiry_at")
      .startAt(newEntryCompletedTime)
      .limitToLast(1)
      .once('value');
  
    if (!snapshot.exists()) {
      await newEntry.ref.update({
        expiry_at: newEntryCompletedTime + TIME_TO_SHOW_AN_IMAGE_MS
      });
      return;
    }
  
    snapshot.forEach(async function (childSnapshot) {
      const latestExpiryAt = childSnapshot.val().expiry_at;
      await newEntry.ref.update({
        expiry_at: latestExpiryAt + TIME_TO_SHOW_AN_IMAGE_MS
      });
    });
  }

async function generateImage(prompt) {
    const modelParameters = {
        prompt,
        num_inference_steps: 100,
        guidance_scale: 9,
        height: 1024,
        width: 1024,
        seed: Math.floor(Math.random() * 100000),
    };

    console.log("Generating image...");
    const out = await banana.run(apiKey, modelKey, modelParameters);

    if (out?.modelOutputs?.[0]?.image_base64) {
        // Upload file to Firebase Storage
        const bucket = admin.storage().bucket();
        const filename = `${uuidv4()}.png`;
        const file = bucket.file(filename);

        const buffer = Buffer.from(out.modelOutputs[0].image_base64, "base64");

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

// generateImage("Someone crazy looking at the sky");
