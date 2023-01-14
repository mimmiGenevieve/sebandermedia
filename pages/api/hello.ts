const contentful = require('contentful')
import { TypeHeroImage, TypeCarousel } from '@/types'

const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: '3x8meoim7gkz',
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: '4kJWXfnpCxtmJ3J-K_hhoRs-qp0aKZ3pwz11MPQhPc8',
})
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.

export default function handler() {
    return client
        .getEntries()
        .then((entry: any) => entry)
        .catch((err: any) => console.log(err))
}
