import { useContext, useState, useEffect } from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
import { ThemeInput } from "../button/input"

export const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [isChecked, setIsChecked] = useState(localStorage.getItem("theme") === JSON.stringify(themes.moon) || theme === themes.moon);

    useEffect(() => {
        setIsChecked(localStorage.getItem("theme") === JSON.stringify(themes.moon) || theme === themes.moon);
      }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme.title === "sun" ? themes.moon : themes.sun;
        setTheme(newTheme);
        localStorage.setItem("theme", JSON.stringify(newTheme));
    };
    
    return (
        <label>
            <ThemeInput
                type="checkbox"
                role="switch"
                checked={isChecked}
                theme={theme}
                onChange={toggleTheme}
            />
        </label>
    )
}