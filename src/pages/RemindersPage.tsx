import { motion } from "framer-motion";
import { useReminders } from "@/hooks/use-reminders";
import { useState } from "react";
import { Plus, Trash2, Check, Circle } from "lucide-react";

export default function RemindersPage() {
  const { reminders, addReminder, toggleReminder, deleteReminder } = useReminders();
  const [newText, setNewText] = useState("");

  const handleAdd = () => {
    if (!newText.trim()) return;
    addReminder(newText.trim());
    setNewText("");
  };

  const completed = reminders.filter((r) => r.completed).length;
  const total = reminders.length;

  return (
    <div className="px-4 pt-4 pb-2 space-y-4 animate-fade-in">
      <div className="text-center">
        <h1 className="font-arabic text-xl text-foreground">Daily Reminders</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {completed}/{total} completed today
        </p>
      </div>

      {/* Progress */}
      <div className="islamic-card p-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full emerald-gradient rounded-full"
            animate={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Add Reminder */}
      <div className="flex gap-2">
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a new reminder..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button
          onClick={handleAdd}
          className="w-10 h-10 rounded-xl emerald-gradient text-primary-foreground flex items-center justify-center shrink-0"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Reminder List */}
      <div className="space-y-2">
        {reminders.map((reminder, i) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`islamic-card p-3.5 flex items-center gap-3 transition-all ${reminder.completed ? "opacity-60" : ""
              }`}
          >
            <button
              onClick={() => toggleReminder(reminder.id)}
              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${reminder.completed
                  ? "bg-emerald-brand text-primary-foreground"
                  : "border-2 border-border"
                }`}
            >
              {reminder.completed ? <Check size={14} /> : <Circle size={14} className="text-transparent" />}
            </button>
            <span
              className={`flex-1 text-sm ${reminder.completed ? "line-through text-muted-foreground" : "text-foreground"
                }`}
            >
              {reminder.text}
            </span>
            <button
              onClick={() => deleteReminder(reminder.id)}
              className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
