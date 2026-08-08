"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const INTRO_SEEN_KEY = "bm-intro-seen";

type IntroValue = {
  introDone: boolean;
  markIntroDone: () => void;
};

const IntroContext = createContext<IntroValue>({
  introDone: true,
  markIntroDone: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      setIntroDone(true);
    }
  }, []);

  const markIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}
    document.documentElement.classList.add("intro-seen");
    setIntroDone(true);
  }, []);

  return (
    <IntroContext.Provider value={{ introDone, markIntroDone }}>
      {children}
    </IntroContext.Provider>
  );
}
