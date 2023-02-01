import Head from 'next/head';
import handler from './api/contentful';
import styled from 'styled-components';
import { Data, TypeSeoFields } from '@/types';
import RenderItem from 'components/RenderItem';

const Container = styled.div``;

const Title = styled.div`
    cursor: default;
    font-size: 2rem;
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
    padding: 2rem 0;

    h1 .bold {
        font-weight: 700;
    }

    h1 .thin {
        font-weight: 300;
        color: #6e121d;
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
            <Container>
                <Title>
                    <h1>
                        <span className="bold">SEBANDER</span>
                        <span className="thin"> | MEDIA</span>
                    </h1>
                </Title>

                {data.map((item) => (
                    <RenderItem item={item} />
                ))}
            </Container>
        </>
    );
};

export async function getServerSideProps() {
    const res = await handler();

    let seo = res.find((item: TypeSeoFields) => item.id === 'seo');
    const data = res.filter((item: Data) => item.id !== 'landingpage');
    const page = res.filter((item: Data) => item.id === 'landingpage');

    if (page.metaDescription) seo.metaDescription = page.metaDescription;

    console.log(page);

    return { props: { data, seo } };
}

export default Home;
