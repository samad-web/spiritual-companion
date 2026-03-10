import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import HomePage from "./HomePage";
import PrayerPage from "./PrayerPage";
import QiblaPage from "./QiblaPage";
import TasbeehPage from "./TasbeehPage";
import DuasPage from "./DuasPage";
import CalendarPage from "./CalendarPage";
import RemindersPage from "./RemindersPage";
import SettingsPage from "./SettingsPage";
import { useTheme } from "@/hooks/use-theme";

const pages: Record<string, React.ComponentType<{ onNavigate?: (tab: string) => void }>> = {
  home: HomePage,
  prayer: PrayerPage,
  qibla: QiblaPage,
  tasbeeh: TasbeehPage,
  duas: DuasPage,
  calendar: CalendarPage,
  reminders: RemindersPage,
  settings: SettingsPage,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  useTheme(); // Initialize theme

  const Page = pages[activeTab] || HomePage;

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <div className="pb-20 overflow-y-auto min-h-screen">
        <Page onNavigate={setActiveTab} />
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
