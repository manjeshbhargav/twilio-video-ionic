# Twilio Video Ionic Example App

## Setup and run

* Clone this repository:
  ```
  git clone https://github.com/manjeshbhargav/twilio-video-ionic.git
  ```

* Install dependencies:
  ```
  cd twilio-video-ionic
  npm install
  ```

* Serve the app:
  ```
  ionic serve
  ```

* Open the following URL in a browser tab:
  ```
  http://localhost:8100/home?token=your_twilio_access_token&room=twilio_room_name
  ```

## Polyfills for twilio-video.js

In `src/polyfills.ts`, add the following imports and define `global`:
  ```typescript
  import 'zone.js/dist/webapis-rtc-peer-connection';
  import 'zone.js/dist/zone-patch-user-media';
  
  (window as any).global = window;
  ```
