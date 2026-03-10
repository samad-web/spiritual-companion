import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import { useLocation, usePrayerTimes, getCurrentPrayer } from "@/hooks/use-prayer";
import { useTasbeeh, dhikrList } from "@/hooks/use-tasbeeh";
import { useReminders } from "@/hooks/use-reminders";
import { islamicQuotes } from "@/data/islamic-data";
import { useState, useEffect } from "react";

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
    <div className="px-4 pt-6 pb-4 space-y-5 animate-fade-in">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="emerald-gradient rounded-2xl p-5 text-primary-foreground islamic-pattern"
      >
        <p className="text-sm opacity-80">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        <h1 className="font-arabic text-2xl mt-1">Assalamu Alaikum</h1>
        {hijri && (
          <p className="text-sm mt-2 opacity-90">
            {hijri.day} {hijri.month.en} {hijri.year} AH
          </p>
        )}
        {gregorian && (
          <p className="text-xs opacity-70">
            {gregorian.day} {gregorian.month.en} {gregorian.year}
          </p>
        )}
      </motion.div>

      {/* Next Prayer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="islamic-card p-4 cursor-pointer"
        onClick={() => onNavigate("prayer")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Next Prayer</p>
            <h2 className="font-arabic text-xl text-foreground">{prayerInfo.next}</h2>
            <p className="text-sm text-muted-foreground">{prayerInfo.nextTime}</p>
          </div>
          <div className="text-right">
            <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center">
              <Clock size={24} className="text-accent-foreground" />
            </div>
            <p className="text-xs text-gold mt-1 font-semibold">{prayerInfo.countdown}</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="islamic-card p-4 cursor-pointer active:scale-95 transition-transform"
          onClick={() => onNavigate("tasbeeh")}
        >
          <p className="text-xs text-muted-foreground">Tasbeeh</p>
          <p className="font-arabic text-lg text-foreground mt-1">{dhikrList[tasbeeh.dhikrIndex].transliteration}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full gold-gradient rounded-full transition-all" style={{ width: `${tasbeeh.progress}%` }} />
            </div>
            <span className="text-xs text-gold font-semibold">{tasbeeh.count}/{tasbeeh.target}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="islamic-card p-4 cursor-pointer active:scale-95 transition-transform"
          onClick={() => onNavigate("reminders")}
        >
          <p className="text-xs text-muted-foreground">Daily Reminders</p>
          <p className="font-arabic text-lg text-foreground mt-1">
            {completedReminders}/{reminders.length}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full emerald-gradient rounded-full transition-all"
                style={{ width: `${reminders.length > 0 ? (completedReminders / reminders.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-emerald-brand font-semibold">Done</span>
          </div>
        </motion.div>
      </div>

      {/* Islamic Quote */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="islamic-card p-4 border-l-4 border-l-gold"
      >
        <div className="flex items-start gap-3">
          <BookOpen size={18} className="text-gold mt-0.5 shrink-0" />
          <p className="text-sm text-foreground/80 italic leading-relaxed">{quote}</p>
        </div>
      </motion.div>
    </div>
  );
}
