import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Settings from "./Settings"
import { atom, useAtomValue } from "jotai"

type Settings = {
  width: number
  height: number
}

export const deviceAtom = atom<MediaDeviceInfo>({} as MediaDeviceInfo)
export const settingsAtom = atom<Settings>({
  width: 1920,
  height: 1080,
})

function App() {
  const device = useAtomValue(deviceAtom)
  const settings = useAtomValue(settingsAtom)
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
      width: { ideal: settings.width },
      height: { ideal: settings.height },
    },
  }

  useEffect(() => {
    capture()
  }, [device, settings])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className={`App h-dvh flex flex-row justify-center space-x-8 bg-background text-white`}
        onClick={() => setOpenSources(!openSources)}
      >
        <video autoPlay playsInline width="1920" height="1080"></video>
        <Settings open={openSources} setOpen={setOpenSources} />
      </div>
    </ThemeProvider>
  )
}

export default App
