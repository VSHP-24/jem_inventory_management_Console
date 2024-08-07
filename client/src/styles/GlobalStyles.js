import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* GREY */
  --color-grey-0: #FFF;
  --color-grey-50: #F0F0F2;
  --color-grey-100: #E9E9EC;
  --color-grey-200: #DEDEE3;
  --color-grey-300: #BEBEC6;
  --color-grey-400: #A8A8B3;
  --color-grey-500: #9292A0;
  --color-grey-600: #686878;
  --color-grey-700: #555562;
  --color-grey-800: #393941;
  --color-grey-900: #09090B;

  /* PRIMARY COLOR ,  TINT & SHADES */

  --color-gold-100: #FFED9D;
  --color-gold-200: #FFE985;
  --color-gold-300: #FFE46C;
  --color-gold-400: #FFE054;
  --color-gold-500: #FFDB3B;
  --color-gold-600: #FFD723;
  --color-gold-700: #FFD20A;


*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  letter-spacing: 0.1rem;


  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html{
  font-size: 62.5%
}

body {
  font-family: "Dosis", sans-serif;
  line-height: 1.5;
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  font-size: 1.6rem;

}

button,nav {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
}

}`;

export default GlobalStyles;
