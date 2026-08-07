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

/* Defaults to done, so anything rendered outside the provider still animates
   rather than sitting invisible waiting for a signal that never arrives. */
const IntroContext = createContext<IntroValue>({
  introDone: true,
  markIntroDone: () => {},
});

export function useIntro() {
  return useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  /* The pre-paint script in layout.tsx already resolved sessionStorage and
     prefers-reduced-motion into the .intro-seen class, so read that instead of
     redoing the logic — and read it in an effect, not during render, so the
     server and client agree on the first pass. */
  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      setIntroDone(true);
    }
  }, []);

  const markIntroDone = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      // Private browsing or a blocked storage partition; the intro just
      // replays next load, which is harmless.
    }
    document.documentElement.classList.add("intro-seen");
    setIntroDone(true);
  }, []);

  return (
    <IntroContext.Provider value={{ introDone, markIntroDone }}>
      {children}
    </IntroContext.Provider>
  );
}
