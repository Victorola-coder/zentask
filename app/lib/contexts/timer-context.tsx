"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

type TimerMode = "focus" | "shortBreak" | "longBreak";

interface TimerContextType {
  mode: TimerMode;
  timeLeft: number;
  isActive: boolean;
  settings: TimerSettings;
  toggleTimer: () => void;
  resetTimer: () => void;
  setMode: (mode: TimerMode) => void;
  updateSettings: (settings: Partial<TimerSettings>) => void;
}

const defaultSettings: TimerSettings = {
  focusDuration: 25,
  shortBreak: 5,
  longBreak: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  ambientSound: null,
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLocalStorage<TimerSettings>(
    "zentask-timer-settings",
    defaultSettings
  );
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isActive, setIsActive] = useState(false);

  // Update timer when mode or settings change
  useEffect(() => {
    if (!isActive) {
      const duration =
        mode === "focus"
          ? settings.focusDuration
          : mode === "shortBreak"
          ? settings.shortBreak
          : settings.longBreak;
      setTimeLeft(duration * 60);
    }
  }, [mode, settings, isActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Handle timer completion (play sound, switch mode, etc.)
      if (settings.soundEnabled) {
        // Play notification sound
        const audio = new Audio("/sounds/notification.mp3");
        audio.play().catch(() => {});
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, settings]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    const duration =
      mode === "focus"
        ? settings.focusDuration
        : mode === "shortBreak"
        ? settings.shortBreak
        : settings.longBreak;
    setTimeLeft(duration * 60);
  };

  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <TimerContext.Provider
      value={{
        mode,
        timeLeft,
        isActive,
        settings,
        toggleTimer,
        resetTimer,
        setMode,
        updateSettings,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
