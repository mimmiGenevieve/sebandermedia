import {
    ApolloClient,
    createHttpLink,
    gql,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NextApiRequest, NextApiResponse } from 'next';

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { slug, type } = req.query;
    let response: any = null;

    if (type === 'seo') {
        response = await client.query({
            query: gql`
                query getSEO {
                    seo(id: "NilR2ZvY7t5u7KM83ucxa") {
                        title
                        description
                    }
                }
            `,
        });
    } else if (type === 'landingpage') {
        response = await client.query({
            query: gql`
                query getLandingpage {
                    pageCollection(where: { landingpage: true }, limit: 1) {
                        items {
                            componentsCollection(limit: 5) {
                                items {
                                    ... on HeroImage {
                                        title
                                        image {
                                            fileName
                                            url
                                        }
                                    }
                                    ... on Carousel {
                                        title
                                        imagesCollection(limit: 10) {
                                            items {
                                                fileName
                                                url
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `,
        });
    } else {
        response.data = await client.query({
            query: gql`
                query GetPageBySlug($slug: String!) {
                    pageCollection(where: { slug: $slug }) {
                        items {
                            metaTitle
                            componentsCollection(limit: 5) {
                                items {
                                    ... on HeroImage {
                                        title
                                        image {
                                            fileName
                                        }
                                    }
                                    ... on Carousel {
                                        title
                                        imagesCollection(limit: 10) {
                                            items {
                                                fileName
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `,
            variables: {
                slug: slug,
            },
        });
    }

    res.status(200).json(response.data);
}
