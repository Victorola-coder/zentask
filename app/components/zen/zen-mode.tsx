"use client";

import { useTask } from "@/app/lib/contexts/task-context";
import { useTimer } from "@/app/lib/contexts/timer-context";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui";
import PomodoroTimer from "../timer/pomodoro-timer";

export default function ZenMode() {
  const { tasks, moveTask } = useTask();
  const { isActive, toggleTimer } = useTimer();

  // Get the first "in-progress" task, or the first "todo" task
  const activeTask =
    tasks.find((t) => t.status === "in-progress") ||
    tasks.find((t) => t.status === "todo");

  const handleComplete = () => {
    if (activeTask) {
      moveTask(activeTask.id, "done");
    }
  };

  if (!activeTask) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#FFFFFF05] flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">All Caught Up!</h2>
          <p className="text-[#FFFFFF60] mt-2">
            No pending tasks found. Take a break or add new tasks.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-4xl mx-auto p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTask.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="w-full text-center space-y-12"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF05] text-[#FFFFFF80] text-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  activeTask.priority === "high"
                    ? "bg-red-500"
                    : activeTask.priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              />
              Current Focus
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {activeTask.title}
            </h1>

            {activeTask.description && (
              <p className="text-xl text-[#FFFFFF60] max-w-2xl mx-auto">
                {activeTask.description}
              </p>
            )}
          </div>

          <div className="flex justify-center py-8">
            <PomodoroTimer />
          </div>

          <div className="flex justify-center gap-4">
            {!isActive && (
              <Button
                variant="primary"
                onClick={toggleTimer}
                className="min-w-[150px]"
              >
                Start Timer
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={handleComplete}
              className="min-w-[150px] gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Complete Task
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
