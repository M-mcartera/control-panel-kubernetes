import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        text-decoration: none;
        box-sizing: border-box;
    }
    body {
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen', 'Ubuntu', 'Roboto', sans-serif;
        color: #333;
        -webkit-font-smoothing: antialiased;
        -mos-osx-font-smoothing: grayscale;
    }
`;
