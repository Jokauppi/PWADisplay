import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Settings from "./Settings"

function App() {
  const [device, setDevice] = useState<MediaDeviceInfo>({} as MediaDeviceInfo)
  const [openSources, setOpenSources] = useState(false)

  const capture = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        const video = document.querySelector("video")
        video!.srcObject = mediaStream
        video!.onloadedmetadata = () => {
          video!.play()
        }
      })
      .catch(err => {
        // always check for errors at the end.
        console.error(`${err.name}: ${err.message}`)
      })
  }

  const constraints = {
    audio: false,
    video: {
      deviceId: device.deviceId,
    },
  }

  useEffect(() => {
    capture()
  }, [device])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className={`App h-dvh flex flex-row justify-center space-x-8 bg-background text-white`}
        onClick={() => setOpenSources(!openSources)}
      >
        <video autoPlay playsInline></video>
        <Settings
          open={openSources}
          setOpen={setOpenSources}
          device={device}
          setDevice={setDevice}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
