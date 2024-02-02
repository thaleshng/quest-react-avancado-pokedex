import { useContext, useState, useEffect } from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
import { ThemeInput } from "../input-theme"

export const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const isMoonTheme = theme.title === "moon";
    const [isChecked, setIsChecked] = useState(localStorage.getItem("theme") === themes.moon.title || isMoonTheme);

    useEffect(() => {
        setIsChecked(localStorage.getItem("theme") === themes.moon.title || isMoonTheme);
    }, [theme, isMoonTheme]);

    const toggleTheme = () => {
        const newTheme = isMoonTheme ? themes.sun : themes.moon;
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme.title);
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