"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type HeaderTheme = {
  /** Page requests hero overlay header (home, water). */
  onDark: boolean;
  /** Opaque white bar with dark text (scrolled past hero or non-hero pages). */
  solid: boolean;
  /** Transparent bar with light text over hero. */
  transparent: boolean;
};

const HeaderThemeContext = createContext<HeaderTheme>({
  onDark: false,
  solid: true,
  transparent: false,
});

export function useHeaderTheme() {
  return useContext(HeaderThemeContext);
}

function readOnDark() {
  return document.documentElement.dataset.nxHeader === "on-dark";
}

export function HeaderThemeProvider({ children }: { children: ReactNode }) {
  const [onDark, setOnDark] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setOnDark(readOnDark());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-nx-header"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!onDark) {
      setHeroVisible(false);
      setScrolled(false);
      delete document.documentElement.dataset.nxHeaderSolid;
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const hero = document.querySelector(".nx-image-hero--bleed");
    if (!hero) {
      setHeroVisible(false);
      return () => window.removeEventListener("scroll", onScroll);
    }

    const io = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { root: null, rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [onDark]);

  const solid = !onDark || scrolled || !heroVisible;

  useEffect(() => {
    if (onDark && solid) {
      document.documentElement.dataset.nxHeaderSolid = "true";
    } else {
      delete document.documentElement.dataset.nxHeaderSolid;
    }
  }, [onDark, solid]);

  const value = useMemo<HeaderTheme>(
    () => ({
      onDark,
      solid,
      transparent: onDark && !solid,
    }),
    [onDark, solid],
  );

  return (
    <HeaderThemeContext.Provider value={value}>{children}</HeaderThemeContext.Provider>
  );
}
