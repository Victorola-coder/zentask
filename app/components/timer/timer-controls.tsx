"use client";

import { useTimer } from "@/app/lib/contexts/timer-context";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "../ui";

export default function TimerControls() {
  const { isActive, toggleTimer, resetTimer, mode, setMode } = useTimer();

  const handleSkip = () => {
    if (mode === "focus") {
      setMode("shortBreak");
    } else {
      setMode("focus");
    }
    resetTimer();
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="secondary"
        onClick={resetTimer}
        className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
        title="Reset Timer"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>

      <Button
        variant="primary"
        onClick={toggleTimer}
        className="w-16 h-16 rounded-full p-0 flex items-center justify-center shadow-lg shadow-primary/20"
      >
        {isActive ? (
          <Pause className="w-8 h-8 fill-current" />
        ) : (
          <Play className="w-8 h-8 fill-current ml-1" />
        )}
      </Button>

      <Button
        variant="secondary"
        onClick={handleSkip}
        className="w-12 h-12 rounded-full p-0 flex items-center justify-center"
        title="Skip"
      >
        <SkipForward className="w-5 h-5" />
      </Button>
    </div>
  );
}
