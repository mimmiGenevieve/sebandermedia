export type { TypeCarousel, TypeCarouselFields } from './TypeCarousel'
export type { TypeHeroImage, TypeHeroImageFields } from './TypeHeroImage'

export interface ContentFulType {
    sys: { contentType: { sys: { id: string } } }
    fields: {
        title: string
        images: { fields: { file: { url: string } } }[]
        image: { fields: { file: { url: string } } }
    }
}

export interface Data {
    id: string
    title: string
    imageUrl?: string
    images?: string[]
}
