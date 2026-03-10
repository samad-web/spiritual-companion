import { useState, lazy, Suspense } from "react";
import BottomNav from "@/components/BottomNav";
import { useTheme } from "@/hooks/use-theme";

const HomePage = lazy(() => import("./HomePage"));
const PrayerPage = lazy(() => import("./PrayerPage"));
const QiblaPage = lazy(() => import("./QiblaPage"));
const TasbeehPage = lazy(() => import("./TasbeehPage"));
const DuasPage = lazy(() => import("./DuasPage"));
const CalendarPage = lazy(() => import("./CalendarPage"));
const RemindersPage = lazy(() => import("./RemindersPage"));
const SettingsPage = lazy(() => import("./SettingsPage"));

const pages: Record<string, React.LazyExoticComponent<React.ComponentType<{ onNavigate?: (tab: string) => void }>>> = {
  home: HomePage,
  prayer: PrayerPage,
  qibla: QiblaPage,
  tasbeeh: TasbeehPage,
  duas: DuasPage,
  calendar: CalendarPage,
  reminders: RemindersPage,
  settings: SettingsPage,
};

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  useTheme(); // Initialize theme

  const Page = pages[activeTab] || HomePage;

  return (
    <div className="h-screen bg-background max-w-lg mx-auto relative flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto pb-20">
        <Suspense fallback={<PageLoader />}>
          <Page onNavigate={setActiveTab} />
        </Suspense>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
