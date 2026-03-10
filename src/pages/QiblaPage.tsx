import { motion } from "framer-motion";
import { useLocation, getQiblaDirection, getDistanceToMecca } from "@/hooks/use-prayer";
import { useState, useEffect } from "react";
import { Navigation } from "lucide-react";

export default function QiblaPage() {
  const { location, loading } = useLocation();
  const [compassHeading, setCompassHeading] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      // @ts-expect-error webkitCompassHeading is Safari-specific
      const heading = e.webkitCompassHeading ?? (e.alpha ? 360 - e.alpha : null);
      if (heading !== null) setCompassHeading(heading);
    };

    if (typeof DeviceOrientationEvent !== "undefined") {
      // @ts-expect-error requestPermission is iOS 13+
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        // @ts-expect-error requestPermission
        DeviceOrientationEvent.requestPermission().then((perm: string) => {
          if (perm === "granted") window.addEventListener("deviceorientation", handler);
        });
      } else {
        window.addEventListener("deviceorientation", handler);
      }
    }

    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  if (loading || !location) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const qiblaAngle = getQiblaDirection(location.latitude, location.longitude);
  const distance = getDistanceToMecca(location.latitude, location.longitude);
  const rotation = compassHeading !== null ? qiblaAngle - compassHeading : qiblaAngle;

  return (
    <div className="px-4 pt-6 pb-4 space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="font-arabic text-2xl text-foreground">Qibla Direction</h1>
        <p className="text-sm text-muted-foreground mt-1">Face towards the Kaaba</p>
      </div>

      {/* Compass */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center"
      >
        <div className="relative w-64 h-64">
          {/* Compass Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-border bg-card shadow-lg">
            {/* Direction Labels */}
            {["N", "E", "S", "W"].map((dir, i) => (
              <span
                key={dir}
                className="absolute text-xs font-bold text-muted-foreground"
                style={{
                  top: i === 0 ? "8px" : i === 2 ? "auto" : "50%",
                  bottom: i === 2 ? "8px" : undefined,
                  left: i === 3 ? "8px" : i === 1 ? "auto" : "50%",
                  right: i === 1 ? "8px" : undefined,
                  transform: i === 0 || i === 2 ? "translateX(-50%)" : "translateY(-50%)",
                }}
              >
                {dir}
              </span>
            ))}
          </div>

          {/* Qibla Arrow */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            <div className="flex flex-col items-center">
              <Navigation size={40} className="text-gold fill-gold -mt-16" />
              <div className="w-0.5 h-16 gold-gradient rounded-full" />
            </div>
          </motion.div>

          {/* Center Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full gold-gradient shadow-lg" />
          </div>
        </div>
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="islamic-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Qibla Angle</p>
          <p className="text-2xl font-bold text-gold mt-1">{qiblaAngle.toFixed(1)}°</p>
        </div>
        <div className="islamic-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Distance to Mecca</p>
          <p className="text-2xl font-bold text-emerald-brand mt-1">{Math.round(distance)}</p>
          <p className="text-xs text-muted-foreground">km</p>
        </div>
      </div>

      {compassHeading === null && (
        <div className="islamic-card p-4 border-l-4 border-l-gold">
          <p className="text-sm text-muted-foreground">
            📱 Compass not available. The arrow shows the Qibla direction relative to North. Use a physical compass to find North.
          </p>
        </div>
      )}
    </div>
  );
}
