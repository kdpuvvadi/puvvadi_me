import { useState, useEffect } from "react"
import useDarkMode from "@fisch0920/use-dark-mode"
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Layout from "../components/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import { darkTheme, lightTheme } from "../styles/theme.config";
import { GoogleAnalytics } from '@next/third-parties/google'
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function MyApp({ Component, pageProps }) {
    const darkMode = useDarkMode(false, { storageKey: null, onChange: null })
    const [isMounted, setIsMounted] = useState(false)

    // const [theme, setTheme] = useState(lightTheme)
    const theme = darkMode.value ? darkTheme : lightTheme;

    useEffect(() => {
        setIsMounted(true);
    }, [])

    return (
        <>
            <GoogleAnalytics gaId="G-8MQ44B3JVG" />
            <ThemeProvider theme={theme}>
                <Head>
                    <meta content="width=device-width, initial-scale=1" name="viewport" />
                    <link rel="icon" href="/favicon.ico" />

                </Head>
                <GlobalStyle />
                <Layout>
                    <DefaultSeo
                        canonical={SEO.openGraph.url}
                        {...SEO}
                        additionalMetaTags={[{
                            name: 'keywords',
                            content: SEO.openGraph.keywords,
                        },
                        {
                            name: 'twitter:image',
                            content: SEO.openGraph.images[0].url
                        },
                        {
                            name: 'twitter:title',
                            content: SEO.openGraph.title,
                        },
                        {
                            name: 'twitter:description',
                            content: SEO.openGraph.description,
                        },
                        {
                            httpEquiv: 'x-ua-compatible',
                            content: 'IE=edge; chrome=1'
                        }]}
                    />
                    {isMounted && <Component {...pageProps} />}
                </Layout>
            </ThemeProvider>
            <Analytics />
            <SpeedInsights />
        </>

    )
}
export default MyApp