import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { TypeSeoFields } from '@/types';
import NextApp, { AppContext, AppProps } from 'next/app';

export default function App({
    Component,
    pageProps,
    metaData,
}: AppProps & { metaData: { seo: TypeSeoFields } }) {
    return (
        <Layout seo={metaData.seo}>
            <Component {...pageProps} />
        </Layout>
    );
}

App.getInitialProps = async (appContext: AppContext) => {
    const response = await fetch('http://localhost:3000/api/graphql?type=seo');
    const metaData = await response.json();
    const appProps = await NextApp.getInitialProps(appContext);

    return { ...appProps, metaData };
};
