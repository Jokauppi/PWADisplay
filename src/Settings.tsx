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
import { useAtom } from "jotai"
import { deviceAtom, settingsAtom } from "./App"
import { Input } from "./components/ui/input"

type ownProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

function Settings({ open, setOpen }: ownProps) {
  const [device, setDevice] = useAtom(deviceAtom)
  const [settings, setSettings] = useAtom(settingsAtom)
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
            <div className="flex flex-row space-x-2 justify-between">
              <ModeToggle />
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
            </div>
            <div className="flex flex-row justify-between space-x-2 items-end">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="width"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Width
                </label>
                <Input
                  type="number"
                  id="width"
                  value={settings.width}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={e =>
                    setSettings({
                      ...settings,
                      width: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="height"
                  className="text-sm text-neutral-700 dark:text-neutral-300"
                >
                  Height
                </label>
                <Input
                  type="number"
                  id="height"
                  value={settings.height}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={e =>
                    setSettings({
                      ...settings,
                      height: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-row justify-between text-xs text-neutral-500 dark:text-neutral-300">
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
