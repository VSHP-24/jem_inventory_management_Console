/* rem and em do NOT depend on html font-size in media queries! Instead, 1rem = 1em = 16px */

//BREAKPOINTS
const size = {
  mobileS: "20em",
  mobileM: "34em",
  tablet: "41em",
  laptopS: "54em",
  laptopL: "75em",
  desktop: "90em",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  tablet: `(max-width: ${size.tablet})`,
  laptopS: `(max-width: ${size.laptopS})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
};
