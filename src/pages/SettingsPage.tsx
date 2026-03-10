import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { useTasbeeh } from "@/hooks/use-tasbeeh";
import { Moon, Sun, RotateCcw, MapPin, Bell } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { isDark, toggle } = useTheme();
  const { reset } = useTasbeeh();
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("prayer-notifications");
    return saved ? JSON.parse(saved) : { Fajr: true, Dhuhr: true, Asr: true, Maghrib: true, Isha: true };
  });

  const toggleNotification = (prayer: string) => {
    const updated = { ...notifications, [prayer]: !notifications[prayer] };
    setNotifications(updated);
    localStorage.setItem("prayer-notifications", JSON.stringify(updated));
  };

  return (
    <div className="px-4 pt-4 pb-2 space-y-4 animate-fade-in">
      <h1 className="font-arabic text-xl text-foreground">Settings</h1>

      {/* Theme */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="islamic-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? <Moon size={20} className="text-gold" /> : <Sun size={20} className="text-gold" />}
            <div>
              <p className="text-sm font-medium text-foreground">Theme</p>
              <p className="text-xs text-muted-foreground">{isDark ? "Dark Mode" : "Light Mode"}</p>
            </div>
          </div>
          <button
            onClick={toggle}
            className={`w-12 h-7 rounded-full p-0.5 transition-colors ${isDark ? "bg-primary" : "bg-border"
              }`}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-card shadow-sm"
              animate={{ x: isDark ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        </div>
      </motion.div>

      {/* Prayer Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="islamic-card p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-emerald-brand" />
          <h3 className="text-sm font-semibold text-foreground">Prayer Notifications</h3>
        </div>
        <div className="space-y-3">
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer) => (
            <div key={prayer} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{prayer}</span>
              <button
                onClick={() => toggleNotification(prayer)}
                className={`w-10 h-6 rounded-full p-0.5 transition-colors ${notifications[prayer] ? "emerald-gradient" : "bg-border"
                  }`}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-card shadow-sm"
                  animate={{ x: notifications[prayer] ? 16 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="islamic-card p-4"
      >
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-gold" />
          <div>
            <p className="text-sm font-medium text-foreground">Location</p>
            <p className="text-xs text-muted-foreground">Using device GPS for prayer times</p>
          </div>
        </div>
      </motion.div>

      {/* Reset Tasbeeh */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={reset}
          className="w-full islamic-card p-4 flex items-center gap-3 text-left"
        >
          <RotateCcw size={20} className="text-destructive" />
          <div>
            <p className="text-sm font-medium text-foreground">Reset Tasbeeh</p>
            <p className="text-xs text-muted-foreground">Reset your Dhikr counter to zero</p>
          </div>
        </button>
      </motion.div>

      <p className="text-center text-xs text-muted-foreground pt-4">
        ﷽ · Islamic Companion v1.0
      </p>
    </div>
  );
}
