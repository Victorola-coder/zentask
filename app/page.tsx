"use client";

import { useState } from "react";
import { Animation, Glow } from "./components/global";
import Sidebar from "./components/layout/sidebar";
import KanbanBoard from "./components/task/kanban-board";
import PomodoroTimer from "./components/timer/pomodoro-timer";
import ZenMode from "./components/zen/zen-mode";
import TimerSettings from "./components/timer/timer-settings";
import AmbientPlayer from "./components/ambient/ambient-player";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [activeTab, setActiveTab] = useState("board");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <Animation>
      <div className="flex h-screen bg-[#0f0f0f] overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 p-4 md:p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === "board" && (
                <motion.div
                  key="board"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full"
                >
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white font-geistSans">
                      Task Board
                    </h1>
                    <p className="text-[#FFFFFF60]">
                      Manage your tasks and track progress
                    </p>
                  </div>
                  <KanbanBoard />
                </motion.div>
              )}

              {activeTab === "timer" && (
                <motion.div
                  key="timer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col items-center justify-center"
                >
                  <Glow className="p-12 bg-[#1A1B1E] max-w-2xl w-full">
                    <PomodoroTimer />
                  </Glow>
                </motion.div>
              )}

              {activeTab === "zen" && (
                <motion.div
                  key="zen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="h-full"
                >
                  <ZenMode />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <TimerSettings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        <AmbientPlayer />
      </div>
    </Animation>
  );
}
