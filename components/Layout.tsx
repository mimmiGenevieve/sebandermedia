import Head from 'next/head';
import { TypeSeoFields } from '@/types';

interface LayoutProps {
    seo: TypeSeoFields;
    children: React.ReactNode;
}

export default function Layout({ children, seo }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{seo?.title}</title>
                <meta name="description" content={seo?.description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/favIcon_dark.ico"
                    media="(prefers-color-scheme:dark)"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/favIcon_light.ico"
                    media="(prefers-color-scheme:light)"
                />
            </Head>
            {children}
        </>
    );
}
