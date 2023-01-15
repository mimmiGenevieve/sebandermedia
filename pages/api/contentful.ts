import { ContentFulType, ContentfulData } from '@/types'

const contentful = require('contentful')

const client = contentful.createClient({
    space: '3x8meoim7gkz',
    accessToken: '4kJWXfnpCxtmJ3J-K_hhoRs-qp0aKZ3pwz11MPQhPc8',
})

export default function handler() {
    return client
        .getEntries()
        .then((entry: { items: ContentFulType[] }) => {
            const data: ContentfulData[] = []

            entry.items.forEach(function (item: ContentFulType) {
                const id = item.sys.contentType.sys.id

                if (id === 'landingpage') {
                    data.push({
                        id,
                        metaDescription: item.fields.seo,
                    })
                } else {
                    data.push({
                        id,
                        title: item.fields.title ?? null,
                        images:
                            item.fields.images?.map(
                                (img: { fields: { file: { url: string } } }) =>
                                    img.fields.file.url
                            ) ?? null,
                        imageUrl: item.fields.image?.fields.file.url ?? null,
                    })
                }
            })

            return data
        })
        .catch((err: any) => console.log(err))
}
