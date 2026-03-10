import { useState, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

interface HijriDate {
  day: string;
  month: { number: number; en: string; ar: string };
  year: string;
  designation: { abbreviated: string };
}

interface PrayerData {
  timings: PrayerTimes;
  date: {
    hijri: HijriDate;
    gregorian: { date: string; day: string; month: { number: number; en: string }; year: string };
  };
}

import { useQuery } from "@tanstack/react-query";

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(() => {
    const saved = localStorage.getItem("user-location");
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!location);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      if (!location) setLocation({ latitude: 21.4225, longitude: 39.8262, city: "Mecca", country: "Saudi Arabia" });
      setLoading(false);
      return;
    }

    const fetchGeoData = async (lat: number, lng: number) => {
      try {
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        const data = await res.json();
        return {
          city: data.city || data.locality || data.principalSubdivision || "Unknown City",
          country: data.countryName || "Unknown Country",
        };
      } catch (err) {
        console.error("Reverse geocoding failed", err);
        return { city: "Unknown City", country: "Unknown Country" };
      }
    };

    const success = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords;
      const geoData = await fetchGeoData(latitude, longitude);

      const newLoc = {
        latitude,
        longitude,
        ...geoData
      };

      setLocation(newLoc);
      localStorage.setItem("user-location", JSON.stringify(newLoc));
      setLoading(false);
    };

    const fail = () => {
      if (!location) {
        const fallback = { latitude: 21.4225, longitude: 39.8262, city: "Mecca", country: "Saudi Arabia" };
        setLocation(fallback);
        localStorage.setItem("user-location", JSON.stringify(fallback));
      }
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, fail, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  return { location, error, loading };
}

export function usePrayerTimes(location: Location | null) {
  const { data: prayerData, isLoading: loading } = useQuery({
    queryKey: ["prayerTimes", location?.latitude, location?.longitude],
    queryFn: async () => {
      if (!location) return null;
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${location.latitude}&longitude=${location.longitude}&method=2`
      );
      const data = await res.json();
      return data.data as PrayerData;
    },
    enabled: !!location,
  });

  return { prayerData, loading };
}

export function getCurrentPrayer(timings: PrayerTimes | undefined): { current: string; next: string; nextTime: string; countdown: string } {
  if (!timings) return { current: "Loading", next: "Loading", nextTime: "", countdown: "" };

  const now = new Date();
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

  const toMinutes = (timeStr: string) => {
    const clean = timeStr.replace(/\s*\(.*\)/, "");
    const [h, m] = clean.split(":").map(Number);
    return h * 60 + m;
  };

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < prayers.length; i++) {
    const prayerMinutes = toMinutes(timings[prayers[i]]);
    if (nowMinutes < prayerMinutes) {
      const prev = i === 0 ? "Isha" : prayers[i - 1];
      const diff = prayerMinutes - nowMinutes;
      const hours = Math.floor(diff / 60);
      const mins = diff % 60;
      const countdown = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
      return {
        current: prev,
        next: prayers[i],
        nextTime: timings[prayers[i]].replace(/\s*\(.*\)/, ""),
        countdown,
      };
    }
  }

  // After Isha — next is Fajr (tomorrow)
  const fajrMinutes = toMinutes(timings.Fajr);
  const diff = 24 * 60 - nowMinutes + fajrMinutes;
  const hours = Math.floor(diff / 60);
  const mins = diff % 60;
  return {
    current: "Isha",
    next: "Fajr",
    nextTime: timings.Fajr.replace(/\s*\(.*\)/, ""),
    countdown: `${hours}h ${mins}m`,
  };
}

export function getQiblaDirection(lat: number, lng: number): number {
  const kaabaLat = (21.4225 * Math.PI) / 180;
  const kaabaLng = (39.8262 * Math.PI) / 180;
  const userLat = (lat * Math.PI) / 180;
  const userLng = (lng * Math.PI) / 180;

  const y = Math.sin(kaabaLng - userLng);
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(kaabaLng - userLng);

  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  if (qibla < 0) qibla += 360;
  return qibla;
}

export function getDistanceToMecca(lat: number, lng: number): number {
  const R = 6371;
  const dLat = ((21.4225 - lat) * Math.PI) / 180;
  const dLng = ((39.8262 - lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat * Math.PI) / 180) * Math.cos((21.4225 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
