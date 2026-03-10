import { motion } from "framer-motion";
import { Clock, BookOpen, Sparkles, MapPin } from "lucide-react";
import { useLocation, usePrayerTimes, getCurrentPrayer } from "@/hooks/use-prayer";
import { useTasbeeh, dhikrList } from "@/hooks/use-tasbeeh";
import { useReminders } from "@/hooks/use-reminders";
import { islamicQuotes } from "@/data/islamic-data";
import { useState, useEffect } from "react";
import islamicPatternBg from "@/assets/islamic-pattern-header.jpg";

export default function HomePage({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { location } = useLocation();
  const { prayerData } = usePrayerTimes(location);
  const tasbeeh = useTasbeeh();
  const { reminders } = useReminders();
  const [quote] = useState(() => islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)]);
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const prayerInfo = getCurrentPrayer(prayerData?.timings);
  const hijri = prayerData?.date?.hijri;
  const gregorian = prayerData?.date?.gregorian;
  const completedReminders = reminders.filter((r) => r.completed).length;

  return (
    <div className="px-3 pt-4 pb-2 space-y-3 animate-fade-in">
      {/* Header with Islamic Pattern */}
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
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 p-5 pb-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-accent opacity-80" />
            <p className="text-xs opacity-80 font-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
          </div>
          <div className="flex items-baseline justify-between mt-1">
            <h1 className="font-arabic text-xl drop-shadow-md">Assalamu Alaikum</h1>
            {location?.city && (
              <p className="text-[10px] opacity-80 flex items-center gap-1 font-medium bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                <MapPin size={10} className="text-accent" />
                {location.city}, {location.country}
              </p>
            )}
          </div>
          {hijri && (
            <p className="text-sm mt-2 opacity-90 drop-shadow-sm">
              {hijri.day} {hijri.month.en} {hijri.year} AH
            </p>
          )}
          {gregorian && (
            <p className="text-xs opacity-70">
              {gregorian.day} {gregorian.month.en} {gregorian.year}
            </p>
          )}
        </div>
      </motion.div>

      {/* Next Prayer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="islamic-card p-4 cursor-pointer active:scale-[0.98] transition-transform"
        onClick={() => onNavigate("prayer")}
      >
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Next Prayer</p>
            <h2 className="font-arabic text-xl text-foreground truncate">{prayerInfo.next}</h2>
            <p className="text-sm text-muted-foreground">{prayerInfo.nextTime}</p>
          </div>
          <div className="text-right shrink-0 ml-3">
            <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-md">
              <Clock size={20} className="text-accent-foreground" />
            </div>
            <p className="text-[11px] text-accent mt-1 font-semibold">{prayerInfo.countdown}</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="islamic-card p-3.5 cursor-pointer active:scale-95 transition-transform"
          onClick={() => onNavigate("tasbeeh")}
        >
          <p className="text-[11px] text-muted-foreground">Tasbeeh</p>
          <p className="font-arabic text-base text-foreground mt-0.5 truncate">{dhikrList[tasbeeh.dhikrIndex].transliteration}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full gold-gradient rounded-full transition-all" style={{ width: `${tasbeeh.progress}%` }} />
            </div>
            <span className="text-[11px] text-accent font-semibold shrink-0">{tasbeeh.count}/{tasbeeh.target}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="islamic-card p-3.5 cursor-pointer active:scale-95 transition-transform"
          onClick={() => onNavigate("reminders")}
        >
          <p className="text-[11px] text-muted-foreground">Daily Reminders</p>
          <p className="font-arabic text-base text-foreground mt-0.5">
            {completedReminders}/{reminders.length}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full primary-gradient rounded-full transition-all"
                style={{ width: `${reminders.length > 0 ? (completedReminders / reminders.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[11px] text-accent font-semibold shrink-0">Done</span>
          </div>
        </motion.div>
      </div>

      {/* Islamic Quote */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="islamic-card p-3.5 border-l-4 border-l-accent"
      >
        <div className="flex items-start gap-2.5">
          <BookOpen size={16} className="text-accent mt-0.5 shrink-0" />
          <p className="text-sm text-foreground/80 italic leading-relaxed">{quote}</p>
        </div>
      </motion.div>
    </div>
  );
}
