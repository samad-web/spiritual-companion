import { motion } from "framer-motion";
import { useLocation, usePrayerTimes } from "@/hooks/use-prayer";
import { islamicEvents } from "@/data/islamic-data";
import { Star } from "lucide-react";

const hijriMonths = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
  "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah",
];

export default function CalendarPage() {
  const { location } = useLocation();
  const { prayerData } = usePrayerTimes(location);

  const hijri = prayerData?.date?.hijri;
  const currentMonth = hijri ? hijri.month.number : 1;
  const currentDay = hijri ? parseInt(hijri.day) : 1;
  const currentYear = hijri ? hijri.year : "";

  const eventsThisMonth = islamicEvents.filter((e) => e.hijriMonth === currentMonth);

  return (
    <div className="px-4 pt-4 pb-2 space-y-4 animate-fade-in">
      <div className="text-center">
        <h1 className="font-arabic text-xl text-foreground">Islamic Calendar</h1>
        {hijri && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {hijri.day} {hijri.month.en} {hijri.year} AH
          </p>
        )}
      </div>

      {/* Current Month Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="emerald-gradient rounded-2xl p-4 text-primary-foreground text-center islamic-pattern"
      >
        <p className="text-xs opacity-70">Current Hijri Month</p>
        <h2 className="font-arabic text-2xl mt-1">{hijriMonths[currentMonth - 1]}</h2>
        <p className="text-base opacity-90 mt-1">Day {currentDay}</p>
      </motion.div>

      {/* Month Grid */}
      <div className="islamic-card p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">{hijriMonths[currentMonth - 1]} — Days</h3>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isToday = day === currentDay;
            const hasEvent = eventsThisMonth.some((e) => e.hijriDay === day);
            return (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all relative ${isToday
                    ? "gold-gradient text-accent-foreground font-bold shadow-md"
                    : hasEvent
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
              >
                {day}
                {hasEvent && !isToday && (
                  <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-gold" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hijri Months */}
      <div className="islamic-card p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">Islamic Months</h3>
        <div className="grid grid-cols-3 gap-2">
          {hijriMonths.map((month, i) => (
            <div
              key={month}
              className={`px-2 py-2 rounded-lg text-xs text-center transition-all ${i + 1 === currentMonth
                  ? "emerald-gradient text-primary-foreground font-semibold"
                  : "bg-secondary text-secondary-foreground"
                }`}
            >
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Islamic Events */}
      <div className="islamic-card p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">Important Islamic Days</h3>
        <div className="space-y-2">
          {islamicEvents.map((event) => (
            <div key={event.name} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
              <Star size={14} className="text-gold shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{event.name}</p>
                <p className="text-xs text-muted-foreground">
                  {event.hijriDay} {hijriMonths[event.hijriMonth - 1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
