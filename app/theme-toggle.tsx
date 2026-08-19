"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("llm-guide-theme");
    const initial = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    requestAnimationFrame(() => setDark(initial));
    document.documentElement.dataset.theme = initial ? "dark" : "light";
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("llm-guide-theme", next ? "dark" : "light");
  }
  return <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}><span aria-hidden="true">{dark ? "☼" : "◐"}</span></button>;
}
