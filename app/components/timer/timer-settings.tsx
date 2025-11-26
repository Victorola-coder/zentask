"use client";

import { Modal, Input, Button, Toggle, Select } from "../ui";
import { useTimer } from "@/app/lib/contexts/timer-context";
import { useState, useEffect } from "react";

interface TimerSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TimerSettings({ isOpen, onClose }: TimerSettingsProps) {
  const { settings, updateSettings } = useTimer();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings, isOpen]);

  const handleSave = () => {
    updateSettings(localSettings);
    onClose();
  };

  const soundOptions = [
    { label: "None", value: "none" },
    { label: "Rain", value: "rain" },
    { label: "White Noise", value: "whitenoise" },
    { label: "Lofi", value: "lofi" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Timer Settings">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#FFFFFF80] uppercase tracking-wider">
            Timer (minutes)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#FFFFFF60] mb-1">
                Focus
              </label>
              <Input
                type="number"
                value={localSettings.focusDuration}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    focusDuration: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-[#FFFFFF60] mb-1">
                Short Break
              </label>
              <Input
                type="number"
                value={localSettings.shortBreak}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    shortBreak: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs text-[#FFFFFF60] mb-1">
                Long Break
              </label>
              <Input
                type="number"
                value={localSettings.longBreak}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    longBreak: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#FFFFFF80] uppercase tracking-wider">
            Automation
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Auto-start Breaks</span>
            <Toggle
              checked={localSettings.autoStartBreaks}
              onChange={(checked) =>
                setLocalSettings({ ...localSettings, autoStartBreaks: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Auto-start Pomodoros</span>
            <Toggle
              checked={localSettings.autoStartPomodoros}
              onChange={(checked) =>
                setLocalSettings({
                  ...localSettings,
                  autoStartPomodoros: checked,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[#FFFFFF80] uppercase tracking-wider">
            Sound
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Timer Sound</span>
            <Toggle
              checked={localSettings.soundEnabled}
              onChange={(checked) =>
                setLocalSettings({ ...localSettings, soundEnabled: checked })
              }
            />
          </div>
          <div>
            <label className="block text-sm text-white mb-2">
              Ambient Sound
            </label>
            <Select
              options={soundOptions}
              defaultValue={localSettings.ambientSound || "none"}
              onChange={(value) =>
                setLocalSettings({
                  ...localSettings,
                  ambientSound: value === "none" ? null : (value as any),
                })
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#FFFFFF10]">
          <Button variant="secondary" onClick={onClose} className="w-auto">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} className="w-auto">
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
