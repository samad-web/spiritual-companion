import { motion } from "framer-motion";
import { useLocation, usePrayerTimes, getCurrentPrayer } from "@/hooks/use-prayer";
import { useState, useEffect } from "react";
import islamicPatternBg from "@/assets/islamic-pattern-header.jpg";

import { Sunrise, Sun, CloudSun, Sunset, Moon } from "lucide-react";

const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
const prayerIcons: Record<string, React.ReactNode> = {
  Fajr: <Sunrise size={20} className="text-amber-500" />,
  Dhuhr: <Sun size={20} className="text-orange-400" />,
  Asr: <CloudSun size={20} className="text-accent" />,
  Maghrib: <Sunset size={20} className="text-orange-500" />,
  Isha: <Moon size={20} className="text-accent" />,
};

export default function PrayerPage() {
  const { location, loading: locLoading } = useLocation();
  const { prayerData, loading } = usePrayerTimes(location);
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || locLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const prayerInfo = getCurrentPrayer(prayerData?.timings);
  const hijri = prayerData?.date?.hijri;

  return (
    <div className="px-3 pt-4 pb-2 space-y-3 animate-fade-in">
      {/* Header Card with Pattern */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden shadow-lg"
      >
        <img
          src={islamicPatternBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/60" />
        <div className="relative z-10 p-5 text-center text-white">
          <p className="text-[11px] opacity-70 uppercase tracking-wider">Next Prayer</p>
          <h1 className="font-arabic text-2xl mt-1 drop-shadow-md">{prayerInfo.next}</h1>
          <p className="text-lg opacity-90 mt-1">{prayerInfo.nextTime}</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5">
            <span className="text-sm font-semibold">{prayerInfo.countdown}</span>
            <span className="text-xs opacity-80">remaining</span>
          </div>
          {hijri && (
            <p className="text-xs mt-3 opacity-70">
              {hijri.day} {hijri.month.en} {hijri.year} AH
            </p>
          )}
        </div>
      </motion.div>

      {/* Prayer List */}
      <div className="space-y-2.5">
        {prayerNames.map((name, i) => {
          const time = prayerData?.timings[name]?.replace(/\s*\(.*\)/, "") || "--:--";
          const isActive = prayerInfo.current === name;
          const isNext = prayerInfo.next === name;

          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`islamic-card p-3.5 flex items-center justify-between transition-all ${isNext ? "prayer-active" : ""
                } ${isActive ? "border-l-4 border-l-primary/70 bg-primary/5" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center shrink-0">
                  {prayerIcons[name]}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{name}</h3>
                  {isActive && <span className="text-[10px] text-primary font-medium uppercase">Current</span>}
                  {isNext && <span className="text-[10px] text-accent font-medium uppercase">Next</span>}
                </div>
              </div>
              <p className={`text-base font-mono ${isNext ? "text-accent font-bold" : "text-foreground"}`}>{time}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
