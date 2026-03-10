import { motion } from "framer-motion";
import { useLocation, usePrayerTimes, getCurrentPrayer } from "@/hooks/use-prayer";
import { useState, useEffect } from "react";

const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
const prayerIcons: Record<string, string> = {
  Fajr: "🌅",
  Dhuhr: "☀️",
  Asr: "🌤️",
  Maghrib: "🌇",
  Isha: "🌙",
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
    <div className="px-4 pt-6 pb-4 space-y-5 animate-fade-in">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="emerald-gradient rounded-2xl p-5 text-primary-foreground text-center islamic-pattern"
      >
        <p className="text-xs opacity-70 uppercase tracking-wider">Next Prayer</p>
        <h1 className="font-arabic text-3xl mt-1">{prayerInfo.next}</h1>
        <p className="text-lg opacity-90 mt-1">{prayerInfo.nextTime}</p>
        <div className="mt-3 inline-flex items-center gap-2 bg-primary-foreground/15 rounded-full px-4 py-1.5">
          <span className="text-sm font-semibold">{prayerInfo.countdown}</span>
          <span className="text-xs opacity-80">remaining</span>
        </div>
        {hijri && (
          <p className="text-xs mt-3 opacity-70">
            {hijri.day} {hijri.month.en} {hijri.year} AH
          </p>
        )}
      </motion.div>

      {/* Prayer List */}
      <div className="space-y-3">
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
              className={`islamic-card p-4 flex items-center justify-between transition-all ${
                isNext ? "prayer-active" : ""
              } ${isActive ? "border-l-4 border-l-emerald-brand" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{prayerIcons[name]}</span>
                <div>
                  <h3 className="font-semibold text-foreground">{name}</h3>
                  {isActive && <span className="text-[10px] text-emerald-brand font-medium uppercase">Current</span>}
                  {isNext && <span className="text-[10px] text-gold font-medium uppercase">Next</span>}
                </div>
              </div>
              <p className={`text-lg font-mono ${isNext ? "text-gold font-bold" : "text-foreground"}`}>{time}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
