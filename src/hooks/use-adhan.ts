import { useEffect, useState, useRef, useCallback } from "react";
import { type PrayerTimes } from "./use-prayer";

const ADHAN_URL = "https://www.islamcan.com/adhan/makkah.mp3";

export function useAdhan(timings: PrayerTimes | undefined) {
    const [isEnabled, setIsEnabled] = useState(() => {
        const saved = localStorage.getItem("adhan-enabled");
        return saved ? JSON.parse(saved) : false;
    });
    const [isUnlocked, setIsUnlocked] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const lastPlayedRef = useRef<string | null>(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(ADHAN_URL);
        }
        localStorage.setItem("adhan-enabled", JSON.stringify(isEnabled));
    }, [isEnabled]);

    const playAdhan = useCallback(async () => {
        try {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                await audioRef.current.play();
            }
        } catch (err) {
            console.error("Adhan playback failed. Audio might be locked by browser.", err);
        }
    }, []);

    useEffect(() => {
        if (!isEnabled || !timings) return;

        const checkAdhan = () => {
            const now = new Date();
            const nowStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

            const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
            for (const prayer of prayers) {
                const prayerTime = timings[prayer].replace(/\s*\(.*\)/, "");
                if (nowStr === prayerTime && lastPlayedRef.current !== prayer) {
                    playAdhan();
                    lastPlayedRef.current = prayer;
                    break;
                }
            }
        };

        const interval = setInterval(checkAdhan, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, [isEnabled, timings, playAdhan]);

    const toggleAdhan = () => setIsEnabled(!isEnabled);

    const unlockAudio = () => {
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                audioRef.current?.pause();
                setIsUnlocked(true);
            }).catch(err => console.error("Unlock failed", err));
        }
    };

    return { isEnabled, toggleAdhan, isUnlocked, unlockAudio };
}
