import { useEffect, useState } from "react"

function App() {
  const [chosenDevice, setChosenDevice] = useState("")
  const [availableDevices, setAvailableDevices] = useState([""])
  const [hide, setHide] = useState(true)

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

  useEffect(() => {
    const getDeviceIds = async () => {
      const videoDevices = await navigator.mediaDevices
        .enumerateDevices()
        .then(devices => devices.filter(device => device.kind == "videoinput"))
        .then(devices => devices.map(device => device.deviceId))
        .then(devices => devices.sort())

      setAvailableDevices(videoDevices)
    }
    getDeviceIds()
  }, [])

  const constraints = {
    audio: false,
    video: {
      deviceId: chosenDevice,
    },
  }

  useEffect(() => {
    capture()
  }, [])

  return (
    <div
      className={`App h-dvh flex flex-row justify-center space-x-8 bg-black text-white`}
      onClick={() => setHide(!hide)}
    >
      <video autoPlay playsInline></video>
      <div className={`h-full ${hide ? "hidden" : "absolute"} top-6`}>
        <div className="flex flex-col space-y-2">
          {availableDevices.map((device, id) => {
            return (
              <button
                key={id}
                className="p-2 rounded-md focus:bg-neutral-400 bg-neutral-800"
                onClick={() => {
                  setChosenDevice(device)
                  capture()
                }}
              >
                Cam {id}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
