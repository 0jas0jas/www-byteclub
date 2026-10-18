// Shared by the toggle and the pre-paint script in the root layout.
export const THEME_KEY = "theme";
export const THEMES = ["system", "light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

// Browser UI color per theme; mirrors --bg in globals.css.
export const THEME_COLORS = { light: "#fbf8f2", dark: "#0f0f0e" } as const;

// Runs in <head> before first paint so a saved choice never flashes the wrong theme.
// "system" is stored as nothing at all, so the default always follows the OS.
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
