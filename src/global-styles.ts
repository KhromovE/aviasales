import { createGlobalStyle } from 'styled-components'

import OpenSans600Woff2 from './assets/fonts/open-sans-v17-latin_cyrillic-600.woff2'
import OpenSansRegularWoff2 from './assets/fonts/open-sans-v17-latin_cyrillic-regular.woff2'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    src: local('Open Sans'), local('OpenSans'), url(${OpenSansRegularWoff2}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans';
    src: local('Open Sans'), local('OpenSans'), url(${OpenSans600Woff2}) format('woff2');
    font-weight: 600;
    font-style: normal;
  }

  :root {
    --page-width: 755px;
    --spacing-sm: 10px;
    --spacing-md: calc(var(--spacing-sm) * 2);
    --border-radius-xs: 2px;
    --border-radius-sm: 5px;
    --border-radius-md: 6px;

    --blue-light: #F1FCFF;
    --blue: #2196F3;
    --gray-lighen: #f3f7fa;
    --gray-light: #dfe5ec;
    --gray: #a0b0b9;
    --gray-dark: #4a4a4a;
    --white: #ffffff;

    --primary: var(--blue);
    --secondary: var(--gray-light);
    
    --shadow: rgba(0, 0, 0, 0.1);

    --letter-spacing: 0.5px;
    --font-weight-normal: normal;
    --font-weight-bold: 600;
    --font-size-xs: 12px;
    --font-size-sm: 13px;
    --font-size-md: 14px;
    --font-size-lg: 24px;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    font-size: var(--font-size-sm);
    font-family: 'Open Sans', sans-serif;
    font-weight: var(--font-weight-normal);
    color: var(--gray-dark);
    background-color: var(--gray-lighen);

    /* https://stackoverflow.com/a/17715571 */
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }

  * {
    box-sizing: border-box;
  }
`
