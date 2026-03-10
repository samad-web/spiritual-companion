import { Home, Clock, Compass, CircleDot, BookOpen, Calendar, Bell, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const primaryTabs = [
  { id: "home", icon: Home, label: "Home" },
  { id: "prayer", icon: Clock, label: "Prayer" },
  { id: "tasbeeh", icon: CircleDot, label: "Tasbeeh" },
  { id: "duas", icon: BookOpen, label: "Duas" },
  { id: "more", icon: Settings, label: "More" },
];

const moreTabs = [
  { id: "qibla", icon: Compass, label: "Qibla" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "reminders", icon: Bell, label: "Reminders" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const [showMore, setShowMore] = useState(false);
  const isMoreActive = moreTabs.some((t) => t.id === activeTab);

  return (
    <>
      {/* More menu overlay */}
      {showMore && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMore(false)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-2 left-2 max-w-lg mx-auto bg-card border border-border rounded-2xl shadow-xl p-2 grid grid-cols-4 gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {moreTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setShowMore(false);
                  }}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-colors ${
                    isActive ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  <tab.icon
                    size={20}
                    className={isActive ? "text-primary" : "text-muted-foreground"}
                  />
                  <span
                    className={`text-[11px] font-medium ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border">
        <div className="flex items-center justify-around px-2 py-1.5 max-w-lg mx-auto safe-area-bottom">
          {primaryTabs.map((tab) => {
            const isActive = tab.id === "more" ? isMoreActive : activeTab === tab.id;
            const isMore = tab.id === "more";

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (isMore) {
                    setShowMore(!showMore);
                  } else {
                    onTabChange(tab.id);
                    setShowMore(false);
                  }
                }}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-0 flex-1"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <tab.icon
                  size={20}
                  className={`relative z-10 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <span
                  className={`relative z-10 text-[10px] font-medium transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {isMore && isMoreActive
                    ? moreTabs.find((t) => t.id === activeTab)?.label || "More"
                    : tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
