import Head from 'next/head'
import handler from './api/contentful'
import styled from 'styled-components'
import { ContentFulType, Data } from '@/types'
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

const Home = ({ data }: { data: Data[] }) => {
    return (
        <>
            <Head>
                <title>Sebander | Media</title>
                <meta
                    name="description"
                    content="Drone Photographer (A1/A2/A3)"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
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
    const data: Data[] = []

    res.items.forEach(function (item: ContentFulType) {
        data.push({
            id: item.sys.contentType.sys.id,
            title: item.fields.title,
            images:
                item.fields.images?.map(
                    (img: { fields: { file: { url: string } } }) =>
                        img.fields.file.url
                ) ?? null,
            imageUrl: item.fields.image?.fields.file.url ?? null,
        })
    })

    return { props: { data } }
}

export default Home
