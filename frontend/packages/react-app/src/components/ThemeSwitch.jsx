import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";

export default function ThemeSwitcher() {
  const theme = window.localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(!(!theme || theme === "light"));
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  useEffect(() => {
    setIsDarkMode(true);
    window.localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return (
    <div>
      <p> </p>
    </div>
  );
}
