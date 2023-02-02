import Head from 'next/head';
import handler from './api/contentful';
import Image from 'next/image';
import styled from 'styled-components';
import { Data, TypeSeoFields } from '@/types';
import RenderItem from 'components/RenderItem';

const Title = styled.div`
    cursor: default;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    z-index: 9;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    text-align: center;
    padding: 0 2%;

    @media only screen and (min-width: 600px) {
        padding: 2rem;
    }

    img {
        height: 5rem;
        max-width: 100%;
    }
`;

const Home = ({ data, seo }: { data: Data[]; seo: TypeSeoFields }) => {
    return (
        <>
            <Head>
                <title>{seo?.metaTitle}</title>
                <meta name="description" content={seo?.metaDescription} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/favicon_dark.ico"
                    media="(prefers-color-scheme:dark)"
                />
                <link
                    rel="icon"
                    href="/favicon_light.ico"
                    media="(prefers-color-scheme:light)"
                />
            </Head>

            <Title>
                <img src="\logo.svg" alt="SEBANDER | MEDIA" />
            </Title>

            {data.map((item) => (
                <RenderItem item={item} key={item.id} />
            ))}
        </>
    );
};

export async function getStaticProps() {
    const res = await handler();

    let seo = res.find((item: TypeSeoFields) => item.id === 'seo');
    const data = res.filter((item: Data) => item.id !== 'landingpage');
    const page = res.filter((item: Data) => item.id === 'landingpage');

    if (page.metaDescription) seo.metaDescription = page.metaDescription;

    return { props: { data, seo } };
}

export default Home;
