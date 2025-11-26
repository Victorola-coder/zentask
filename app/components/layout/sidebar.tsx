"use client";

import { LayoutDashboard, Timer, Focus, Settings, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Glow } from "../global";
import { Button } from "../ui";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenSettings: () => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  onOpenSettings,
}: SidebarProps) {
  const menuItems = [
    { id: "board", label: "Board", icon: LayoutDashboard },
    { id: "timer", label: "Timer", icon: Timer },
    { id: "zen", label: "Zen Mode", icon: Focus },
  ];

  return (
    <div className="w-20 md:w-64 h-full flex flex-col border-r border-[#FFFFFF05] bg-[#0f0f0f]">
      <div className="p-6">
        <h1 className="hidden md:block text-2xl font-bold font-geistSans bg-gradient-to-r from-primary to-[#6366F1] bg-clip-text text-transparent">
          ZenTask
        </h1>
        <div className="md:hidden w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-[#6366F1]" />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-[#FFFFFF60] hover:text-white hover:bg-[#FFFFFF05]"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden md:block font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#FFFFFF05] space-y-2">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-[#FFFFFF60] hover:text-white hover:bg-[#FFFFFF05] transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="hidden md:block font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}
