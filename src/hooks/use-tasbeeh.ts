import { useState, useEffect, useCallback } from "react";

interface TasbeehState {
  count: number;
  target: number;
  dhikrIndex: number;
}

export const dhikrList = [
  { arabic: "سُبْحَانَ اللَّهِ", transliteration: "SubhanAllah", target: 33 },
  { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", target: 33 },
  { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", target: 34 },
  { arabic: "لَا إِلَهَ إِلَّا اللَّهُ", transliteration: "La ilaha illallah", target: 100 },
  { arabic: "أَسْتَغْفِرُ اللَّهَ", transliteration: "Astaghfirullah", target: 100 },
];

export function useTasbeeh() {
  const [state, setState] = useState<TasbeehState>(() => {
    const saved = localStorage.getItem("tasbeeh-state");
    return saved ? JSON.parse(saved) : { count: 0, target: 33, dhikrIndex: 0 };
  });

  useEffect(() => {
    localStorage.setItem("tasbeeh-state", JSON.stringify(state));
  }, [state]);

  const increment = useCallback(() => {
    setState((prev) => {
      if (prev.count >= prev.target) return prev;
      return { ...prev, count: prev.count + 1 };
    });
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({ ...prev, count: 0 }));
  }, []);

  const selectDhikr = useCallback((index: number) => {
    setState({ count: 0, target: dhikrList[index].target, dhikrIndex: index });
  }, []);

  const currentDhikr = dhikrList[state.dhikrIndex];
  const progress = state.target > 0 ? (state.count / state.target) * 100 : 0;
  const remaining = state.target - state.count;

  return { ...state, currentDhikr, progress, remaining, increment, reset, selectDhikr };
}
