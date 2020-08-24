import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        position: relative;
    }

    ::selection,
    ::-webkit-selection {
        background: #00f;
        color: #fff;
    }

    *:focus {
        outline-color: #00f;
    }

    canvas {
        display: block;
    }

    @font-face {
        font-family: 'TexGyre';
        src: url('/static/fonts/texgyrebonum-bold-webfont.eot');
        src: url('/static/fonts/texgyrebonum-bold-webfont.eot?#iefix') format('embedded-opentype'), url('/static/fonts/texgyrebonum-bold-webfont.woff') format('woff'), url('/static/fonts/texgyrebonum-bold-webfont.ttf') format('truetype'), url('/static/fonts/texgyrebonum-bold-webfont.svg#tex_gyre_bonumbold') format('svg');
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: 'TexGyre';
        src: url('/static/fonts/texgyrebonum-bolditalic-webfont.eot');
        src: url('/static/fonts/texgyrebonum-bolditalic-webfont.eot?#iefix') format('embedded-opentype'), url('/static/fonts/texgyrebonum-bolditalic-webfont.woff') format('woff'), url('/static/fonts/texgyrebonum-bolditalic-webfont.ttf') format('truetype'), url('/static/fonts/texgyrebonum-bolditalic-webfont.svg#tex_gyre_bonumbolditalic') format('svg');
        font-weight: normal;
        font-style: italic;
    }

    @font-face {
        font-family: 'TexGyre';
        src: url('/static/fonts/texgyrebonum-regular-webfont.eot');
        src: url('/static/fonts/texgyrebonum-regular-webfont.eot?#iefix') format('embedded-opentype'), url('/static/fonts/texgyrebonum-regular-webfont.woff') format('woff'), url('/static/fonts/texgyrebonum-regular-webfont.ttf') format('truetype'), url('/static/fonts/texgyrebonum-regular-webfont.svg#tex_gyre_bonumregular') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'TexGyre';
        src: url('/static/fonts/texgyrebonum-italic-webfont.eot');
        src: url('/static/fonts/texgyrebonum-italic-webfont.eot?#iefix') format('embedded-opentype'), url('/static/fonts/texgyrebonum-italic-webfont.woff') format('woff'), url('/static/fonts/texgyrebonum-italic-webfont.ttf') format('truetype'), url('/static/fonts/texgyrebonum-italic-webfont.svg#tex_gyre_bonumitalic') format('svg');
        font-weight: normal;
        font-style: italic;
    }

    html, body {
        margin: 0;
        padding: 0;
    }

    body {
        color: #424242;
        font-family: 'Yrsa', "Times New Roman",  Times, serif;
        line-height: 1.4;
        overflow-x: hidden;
    }

    a {
        color: #0000ff;
        text-decoration: underline;
    }
    
    :root {
        font-size: 18px;
    }

    @media screen and (max-width: 1200px) {
        :root {
            font-size: 16px;
        }
    }
`;
