import Head from 'next/head'
import handler from './api/contentful'
import styled from 'styled-components'
import { Data, Seo } from '@/types'
import RenderItem from 'components/RenderItem'

const Container = styled.div`
    background-color: #181818;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2rem;
    color: #929292;
    cursor: default;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */

    h1 .bold {
        font-weight: 700;
    }

    h1 .thin {
        font-weight: 300;
        color: #6e121d;
    }
`

const Home = ({ data, seo }: { data: Data[]; seo: Seo }) => {
    return (
        <>
            <Head>
                <title>Sebander | Media</title>
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
                <h1>
                    <span className="bold">SEBANDER</span>
                    <span className="thin"> | MEDIA</span>
                </h1>
                {data.map((item) => (
                    <RenderItem item={item} />
                ))}
            </Container>
        </>
    )
}

export async function getServerSideProps() {
    const res = await handler()

    const seo = res.find((item: Seo) => item.id === 'landingpage')
    const data = res.filter((item: Data) => item.id !== 'landingpage')

    return { props: { data, seo } }
}

export default Home
