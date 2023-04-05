import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { TypeSeoFields } from '@/types';
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { log } from 'console';
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
    const httpLink = createHttpLink({
        uri: 'https://graphql.contentful.com/content/v1/spaces/3x8meoim7gkz/environments/master',
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${process.env.accessToken}`,
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    const response = await client.query({
        query: gql`
            query getSEO {
                seo(id: "NilR2ZvY7t5u7KM83ucxa") {
                    title
                    description
                }
            }
        `,
    });

    // const response = await fetch('http://localhost:3000/api/graphql?type=seo');
    const metaData = response?.data;
    const appProps = await NextApp.getInitialProps(appContext);

    return { ...appProps, metaData };
};
