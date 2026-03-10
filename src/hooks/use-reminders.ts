import { useState, useEffect } from "react";

export interface Reminder {
  id: string;
  text: string;
  completed: boolean;
}

const defaultReminders: Reminder[] = [
  { id: "1", text: "Read Quran", completed: false },
  { id: "2", text: "Morning Dhikr", completed: false },
  { id: "3", text: "Evening Dhikr", completed: false },
  { id: "4", text: "Pray Tahajjud", completed: false },
  { id: "5", text: "Give Charity", completed: false },
];

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem("islamic-reminders");
    return saved ? JSON.parse(saved) : defaultReminders;
  });

  useEffect(() => {
    localStorage.setItem("islamic-reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (text: string) => {
    setReminders((prev) => [...prev, { id: Date.now().toString(), text, completed: false }]);
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)));
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const editReminder = (id: string, text: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, text } : r)));
  };

  return { reminders, addReminder, toggleReminder, deleteReminder, editReminder };
}
