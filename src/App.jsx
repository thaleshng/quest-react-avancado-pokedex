import { createGlobalStyle } from 'styled-components';
import flexoBold from './assets/fonts/Flexo-Bold.ttf'
import flexoDemi from './assets/fonts/Flexo-Demi.ttf'
import flexoMedium from './assets/fonts/Flexo-Medium.ttf'
import { AppRoutes } from './pages/routes';
import { ThemeProvider } from './contexts/theme-context';
import { ThemeTogglerButton } from './components/theme-toggler-button/theme-toggler-button';
import { useContext } from 'react';
import { ThemeContext, themes } from './contexts/theme-context';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === themes.sun ? themes.moon : themes.sun);
  };

  return (
    <>
      <ThemeTogglerButton onClick={toggleTheme} />
      <GlobalStyle theme={theme} />
      <AppRoutes />
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  list-style-type: none;
 }

 @font-face {
  font-family: 'Flexo-Bold';
  src: local('Flexo-Bold'), url(${flexoBold}) format('truetype');
}

@font-face {
  font-family: 'Flexo-Demi';
  src: local('Flexo-Demi'), url(${flexoDemi}) format('truetype');
}

@font-face {
  font-family: 'Flexo-Medium';
  src: local('Flexo-Medium'), url(${flexoMedium}) format('truetype');
}

 body {
  max-width: 1280px;
  height: 100vh;
  margin: 0 auto;
  background: ${props => props.theme['--bg-image']} center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
 }
`