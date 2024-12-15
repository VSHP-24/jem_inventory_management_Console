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

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #f32013;


  --color-green-100: #306844;
  --color-green-700: #399471;
  --color-green-800: #2c4c3b;

  --color-blue-100: #002D62;
  --color-blue-800: #00308F;

  --color-expense-100: #F40009;
  --color-expense-700: #b91c1c;
  --color-expense-800: #f32013;

  --color-orange-100: #FF8303;



  --backdrop-color: rgba(255, 233, 133, .1)


  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  

    --image-grayscale: 0;
    --image-opacity: 100%;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  letter-spacing: 0.1rem;
  scroll-behavior: smooth;
  scrollbar-color: var(--color-gold-100) var(--color-grey-800);
  scrollbar-width: thin;


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

input,
button,
textarea,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-grey-900);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  text-decoration: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

}`;

export default GlobalStyles;
