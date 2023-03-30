import * as Contentful from 'contentful';
export type { TypeCarousel, TypeCarouselFields } from './TypeCarousel';
export type { TypeHeroImage, TypeHeroImageFields } from './TypeHeroImage';

interface Image {
    fields: { file: { url: string } };
}

export interface ContentFulType {
    sys: { contentType: { sys: { id: string } } };
    fields: {
        title: string;
        description?: string;
        favicon?: Contentful.Asset;
        logo?: Contentful.Asset;
        images: Image[];
        image: Image;
    };
}

export interface ContentfulData {
    id: string;
    metaDescription?: string;
    metaTitle?: string;
    favicon?: Contentful.Asset;
    logo?: Contentful.Asset;
    title?: string;
    imageUrl?: string;
    images?: string[];
}

export interface Data {
    image: any;
    imagesCollection: any;
    __typename: string;
    id: string;
    title?: string;
    imageUrl?: string;
    images?: string[];
}

export interface TypeSeoFields {
    id: string;
    title?: string;
    description?: string;
}
