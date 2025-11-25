"use client";

import { Animation, Glow } from "./components/global";
import { Button } from "./components/ui";

export default function Home() {
  return (
    <Animation>
      <div className="min-h-screen flex items-center justify-center p-8">
        <Glow className="max-w-2xl w-full p-12 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold font-geistSans bg-gradient-to-r from-primary to-[#6366F1] bg-clip-text text-transparent">
              Welcome to ZenTask
            </h1>
            <p className="text-[#FFFFFF80] text-lg max-w-xl mx-auto">
              A modern Next.js template with beautiful UI components, ready for your next project.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button variant="primary">
              Get Started
            </Button>
            <Button variant="secondary">
              View Components
            </Button>
          </div>

          <div className="pt-8 border-t border-[#FFFFFF20]">
            <p className="text-sm text-[#FFFFFF60]">
              Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </Glow>
      </div>
    </Animation>
  );
}
