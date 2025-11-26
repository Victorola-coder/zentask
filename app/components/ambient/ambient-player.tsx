"use client";

import { useTimer } from "@/app/lib/contexts/timer-context";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientPlayer() {
  const { settings } = useTimer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Sound sources (using placeholder URLs for now - replace with actual assets)
  const sounds = {
    rain: "https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-1253.mp3",
    whitenoise: "https://assets.mixkit.co/sfx/preview/mixkit-white-noise-1254.mp3",
    lofi: "https://assets.mixkit.co/sfx/preview/mixkit-night-forest-with-insects-2414.mp3", // Using nature sound as lofi placeholder
  };

  useEffect(() => {
    if (!settings.ambientSound || !sounds[settings.ambientSound]) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      return;
    }

    const soundUrl = sounds[settings.ambientSound];

    if (!audioRef.current || audioRef.current.src !== soundUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(soundUrl);
      audioRef.current.loop = true;
    }

    if (settings.soundEnabled && !isMuted) {
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
        console.log("Autoplay prevented");
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [settings.ambientSound, settings.soundEnabled, isMuted]);

  if (!settings.ambientSound) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="p-3 rounded-full bg-[#1A1B1E] border border-[#FFFFFF10] text-[#FFFFFF80] hover:text-white hover:bg-[#25262B] transition-all shadow-lg"
        title={isMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
