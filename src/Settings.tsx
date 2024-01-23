import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ModeToggle } from "./components/mode-toggle"
import { prop, sortBy } from "ramda"
import { useState } from "react"

type ownProps = {
  open: boolean
  setOpen: (open: boolean) => void
  device: MediaDeviceInfo
  setDevice: (device: MediaDeviceInfo) => void
}

function Settings({ open, setOpen, device, setDevice }: ownProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])

  const getDevices = async () => {
    const videoDevices = await navigator.mediaDevices
      .enumerateDevices()
      .then(devices => devices.filter(device => device.kind == "videoinput"))
      .then(sortBy(prop("deviceId")))
    return videoDevices
  }

  const changeDevice = (deviceId: string) => {
    const device = devices.find(device => device.deviceId == deviceId)
    setDevice(device || ({} as MediaDeviceInfo))
  }

  getDevices().then(devices => setDevices(devices))

  return (
    <div
      className="absolute top-0 right-0"
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sources</DialogTitle>
            <DialogDescription>
              Choose which source you want to display.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Select value={device.deviceId} onValueChange={changeDevice}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={device.label || "Choose Source"} />
              </SelectTrigger>
              <SelectContent>
                {devices.map((device: MediaDeviceInfo) => (
                  <SelectItem value={device.deviceId}>
                    {device.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-row justify-between">
              <ModeToggle />
            </div>
            <div className="flex flex-row justify-between text-xs text-neutral-500">
              <p>
                Lincensed under the{" "}
                <a
                  href="https://github.com/Jokauppi/PWADisplay/blob/main/LICENSE"
                  className="hover:text-white underline"
                  target="_blank"
                >
                  MIT License
                </a>
              </p>
              <a
                href="https://github.com/Jokauppi/PWADisplay"
                className="hover:text-white underline"
                target="_blank"
              >
                Contribute
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Settings
