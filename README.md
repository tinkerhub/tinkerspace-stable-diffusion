# Stable Diffusion Interactive Showcase

An interactive experience for people to try out Stable Diffusion.

It can be launched on a large screen. Anyone can then scan a QR code and type their prompt. The request will get picked up by a background worker. Generated image will be shown on the screen when it's ready.

This is an experimental project built with React, Firebase Realtime Database. It currently uses banana.dev to run the Stable Diffusion model. 

How it looks like on the screen:
![Screenshot of the large screen ](https://github.com/tinkerhub/tinkerspace-stable-diffusion/blob/main/screenshots/screen.png?raw=true)

And this shows up after scanning the QR code:
![Screenshot of the mobile page](https://github.com/tinkerhub/tinkerspace-stable-diffusion/blob/main/screenshots/mobile.png?raw=true)

### How to run
- Set up the .env file by referring to example.env
- `npm install`
- `node worker.js` to start the worker (use a process manager to run it in the background)
- `npm run dev` to launch the development version

### License
MIT License