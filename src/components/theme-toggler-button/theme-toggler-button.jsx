import { useContext, useState, useEffect } from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
import { ThemeInput } from "../button/input"

export const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [isChecked, setIsChecked] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === JSON.stringify(themes.moon) || theme === themes.moon;
    });

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        setIsChecked(storedTheme === JSON.stringify(themes.moon) || theme === themes.moon);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme.title === "sun" ? themes.moon : themes.sun;
        setTheme(newTheme);
        localStorage.setItem("theme", JSON.stringify(newTheme));
    };
    
    return (
        <>
            <ThemeInput 
                type="checkbox" 
                role="switch" 
                checked={isChecked} 
                theme={theme} 
                onClick={toggleTheme} 
            />
        </>
    )
}