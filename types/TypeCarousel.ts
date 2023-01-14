import * as Contentful from "contentful";

export interface TypeCarouselFields {
    title?: Contentful.EntryFields.Symbol;
    images: Contentful.Asset[];
}

export type TypeCarousel = Contentful.Entry<TypeCarouselFields>;
