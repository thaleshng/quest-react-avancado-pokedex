import { createContext, useEffect, useState } from "react";
import backgroundImageSun from '../assets/images/pokemon-sun.jpg'
import backgroundImageMoon from '../assets/images/pokemon-moon.png'

export const themes = {
    sun: {
        '--bg-image': `url(${backgroundImageSun})`,
        '--primary-bg-color': "#FF7B3C",
        '--primary-bg-color-opacity': "rgba(255, 123, 60, 0.8)",
        '--primary-bg-color-hover': "#FF7B4C",
        '--border-color': "#FF6B2E",
        '--secundary-bg-color': "#FFA07A",
        '--secundary-bg-color-opacity': "rgba(255, 160, 122, 0.8)",
        '--ability-info-color-hover': "#FF6B4E",
        '--scrollbar-color': "#FF6900",
        '--general-color': "#000000",
        '--bg-color-input-theme': "#FF8C7B",
    },
    moon: {
        '--bg-image': `url(${backgroundImageMoon})`,
        '--primary-bg-color': "#1F1F3A",
        '--primary-bg-color-opacity': "rgba(31, 31, 58, 0.8)",
        '--primary-bg-color-hover': "#1F1F4A",
        '--border-color': "#0C053A",
        '--secundary-bg-color': "#333364",
        '--secundary-bg-color-opacity': "rgba(51, 51, 100, 0.8)",
        '--ability-info-color-hover': "#3C64C8",
        '--scrollbar-color': "#0C052A",
        '--general-color': "#FFFFFF",
        '--bg-color-input-theme': "#333384"
    }
}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme ? JSON.parse(storedTheme) : themes.sun;
    });

    useEffect(() => {
        Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}