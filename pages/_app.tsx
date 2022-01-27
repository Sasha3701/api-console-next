import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { createGlobalStyle } from "styled-components";
import Layout from "../layout";
import { typesPath } from "../models";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
  }
  :root {
    --color-primary: #F6F6F6;
    --color-gray-light: #00000033;
    --color-gray-medium: #C4C4C4;
    --color-gray: #00000066;
    --color-blue: #0055FB;
    --color-blue-light: #45A5FF;
    --color-red: #CF2C00;
    --color-red-light: #CF2C001A;
    --color-green: #30B800;
    --text-color-main: #0D0D0D;
    --text-color-gray: #999999;
    --text-colot-white: #FFFFFF;
    --gradient-blue: linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
    --gradient-blue-light: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
    --gradient-blue-dark: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%), #C4C4C4;
    --gradient-gray: linear-gradient(0deg, #C4C4C4, #C4C4C4), linear-gradient(180deg, #45A6FF 0%, #0055FB 100%);
  }
`;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();

  return (
    <>
      <GlobalStyle />
      <Layout.Default path={pathname as typesPath}>
        <Component {...pageProps} />
      </Layout.Default>
    </>
  );
};

export default MyApp;
