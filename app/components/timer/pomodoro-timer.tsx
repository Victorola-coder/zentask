"use client";

import { useTimer } from "@/app/lib/contexts/timer-context";
import { motion } from "framer-motion";
import TimerControls from "./timer-controls";
import { Glow } from "../global";

export default function PomodoroTimer() {
  const { timeLeft, mode, settings } = useTimer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const totalTime =
    mode === "focus"
      ? settings.focusDuration * 60
      : mode === "shortBreak"
      ? settings.shortBreak * 60
      : settings.longBreak * 60;

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-[#FFFFFF10]"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            className={`${
              mode === "focus" ? "text-primary" : "text-green-500"
            }`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 - progress / 100 }}
            transition={{ duration: 0.5, ease: "linear" }}
            style={{
              strokeDasharray: 2 * Math.PI * 120,
              strokeDashoffset: 2 * Math.PI * 120 * (progress / 100),
            }}
          />
        </svg>

        <div className="absolute flex flex-col items-center">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span
              className={`text-sm font-medium uppercase tracking-wider ${
                mode === "focus" ? "text-primary" : "text-green-500"
              }`}
            >
              {mode === "focus"
                ? "Focus Time"
                : mode === "shortBreak"
                ? "Short Break"
                : "Long Break"}
            </span>
            <div className="text-6xl font-bold font-geistMono text-white mt-2">
              {formatTime(timeLeft)}
            </div>
          </motion.div>
        </div>
      </div>

      <TimerControls />
    </div>
  );
}
