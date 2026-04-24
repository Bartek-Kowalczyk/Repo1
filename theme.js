import {elements} from "./elements.js";

export function theme(){
    const storage_key = "theme";
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const saved = localStorage.getItem(storage_key);
    const isDark = saved ? saved === "dark" : mediaQuery.matches;

    document.body.classList.toggle("dark-mode", isDark);
    elements.darkSwitch.checked = isDark;

    elements.darkSwitch.addEventListener("change", () => {
        const enabled = elements.darkSwitch.checked;
        document.body.classList.toggle("dark-mode", enabled);
        localStorage.setItem(storage_key, enabled ? "dark" : "light");
    });
}