import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
// import { ThemeButton } from "../button/button"
import { ThemeInput } from "../button/input"

export const ThemeTogglerButton = () => {
    
    const { theme, setTheme } = useContext(ThemeContext)
    
    return (
        <>
            <ThemeInput type="checkbox" role="switch" checked={theme === themes.moon} theme={theme} onClick={() => setTheme(theme === themes.sun ? themes.moon : themes.sun)} />
        </>
    )
}