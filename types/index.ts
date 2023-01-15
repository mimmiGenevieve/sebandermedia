export type { TypeCarousel, TypeCarouselFields } from './TypeCarousel'
export type { TypeHeroImage, TypeHeroImageFields } from './TypeHeroImage'

export interface ContentFulType {
    sys: { contentType: { sys: { id: string } } }
    fields: {
        seo: string
        title: string
        images: { fields: { file: { url: string } } }[]
        image: { fields: { file: { url: string } } }
    }
}

export interface ContentfulData {
    id: string
    metaDescription?: string
    title?: string
    imageUrl?: string
    images?: string[]
}

export interface Data {
    id: string
    title?: string
    imageUrl?: string
    images?: string[]
}

export interface Seo {
    id: string
    metaDescription?: string
}
