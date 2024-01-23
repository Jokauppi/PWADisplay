# PWADisplay

📷 A simple PWA application to locally show video feeds from connected capture cards or cameras.

🖥️ Intended for using a mobile device as an external/secondary display for a camera/laptop without unneccessary control or other distractions. (Not working yet on mobile, see [todo](#todo))

## Usage

- Install application from browser menu
  - Only installable on `localhost` or when hosting with a valid SSL certificate (PWA restriction)
- Click/tap video feed to open source dialog

## Local installation

```
git clone https://github.com/jokauppi/PWADisplay.git
cd PWADisplay
npm ci
npm run build
npm run preview -- --open
```

## Todo

- Access USB capture cards / webcams on Chrome mobile
  - `navigator.mediaDevices.getUserMedia` can't access USB devices so these have to be supported through the WebUSB API

## Licence

Licensed under the [MIT License](./LICENSE).
