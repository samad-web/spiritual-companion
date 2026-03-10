import { motion, AnimatePresence } from "framer-motion";
import { useTasbeeh, dhikrList } from "@/hooks/use-tasbeeh";
import { RotateCcw } from "lucide-react";

export default function TasbeehPage() {
  const { count, target, dhikrIndex, currentDhikr, progress, remaining, increment, reset, selectDhikr } = useTasbeeh();

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const isComplete = remaining <= 0;

  return (
    <div className="px-4 pt-6 pb-4 space-y-5 animate-fade-in">
      <div className="text-center">
        <h1 className="font-arabic text-2xl text-foreground">Tasbeeh Counter</h1>
        <p className="text-sm text-muted-foreground mt-1">Digital Dhikr Counter</p>
      </div>

      {/* Dhikr Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {dhikrList.map((dhikr, i) => (
          <button
            key={i}
            onClick={() => selectDhikr(i)}
            className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              i === dhikrIndex
                ? "emerald-gradient text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {dhikr.transliteration}
          </button>
        ))}
      </div>

      {/* Counter Circle */}
      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={increment}
          disabled={isComplete}
          className="relative w-56 h-56 rounded-full focus:outline-none"
        >
          {/* SVG Ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
            <motion.circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(43, 85%, 40%)" />
                <stop offset="100%" stopColor="hsl(43, 80%, 55%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Content */}
          <div className="absolute inset-4 rounded-full bg-card shadow-inner flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground font-arabic">{currentDhikr.arabic}</p>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-4xl font-bold text-foreground mt-1"
              >
                {count}
              </motion.span>
            </AnimatePresence>
            <p className="text-xs text-muted-foreground mt-1">
              {isComplete ? "✓ Complete!" : `${remaining} remaining`}
            </p>
          </div>
        </motion.button>
      </div>

      <p className="text-center text-xs text-muted-foreground">{currentDhikr.transliteration} · Target: {target}</p>

      {/* Reset */}
      <div className="flex justify-center">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium transition-colors hover:bg-muted"
        >
          <RotateCcw size={16} />
          Reset Counter
        </button>
      </div>
    </div>
  );
}
