import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
import { Button } from "../button/button"

export const ThemeTogglerButton = () => {
    
    const { theme, setTheme } = useContext(ThemeContext)
    
    return (
        <>
            <Button theme={theme} onClick={() => setTheme(theme === themes.sun ? themes.moon : themes.sun)}>Clique aqui</Button>
        </>
    )
}