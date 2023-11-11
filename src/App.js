import { Home } from './components/home/home';
import { createGlobalStyle } from 'styled-components';
import backgroundImage from './assets/images/pokemon-sun.jpg';
import flexoBold from './assets/fonts/Flexo-Bold.ttf'
import flexoDemi from './assets/fonts/Flexo-Demi.ttf'
import flexoMedium from './assets/fonts/Flexo-Medium.ttf'

function App() {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
 * {
  margin: 0;
  padding: 0;
  // box-sizing: border-box;
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
  margin: 0 auto;
  background: url(${backgroundImage}) center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
 }
`