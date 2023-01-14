import * as Contentful from "contentful";

export interface TypeHeroImageFields {
    image: Contentful.Asset;
    title: Contentful.EntryFields.Symbol;
    description?: Contentful.EntryFields.Text;
}

export type TypeHeroImage = Contentful.Entry<TypeHeroImageFields>;
