import { ContentFulType, ContentfulData } from '@/types';

const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.space,
    accessToken: process.env.accessToken,
});

export default function handler() {
    return client
        .getEntries()
        .then((entry: { items: ContentFulType[] }) => {
            const data: ContentfulData[] = [];

            entry.items.forEach(function (item: ContentFulType) {
                const id = item.sys.contentType.sys.id;
                console.log(item);

                if (id === 'seo') {
                    data.push({
                        id,
                        metaDescription: item.fields.description ?? '',
                        metaTitle: item.fields.title ?? '',
                    });
                } else if (id === 'landingpage') {
                    data.push({
                        id,
                        metaDescription: item.fields.description ?? '',
                    });
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
                    });
                }
            });

            return data;
        })
        .catch((err: any) => console.log(err));
}
