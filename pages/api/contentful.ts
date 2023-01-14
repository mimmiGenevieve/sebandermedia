const contentful = require('contentful')

const client = contentful.createClient({
    space: '3x8meoim7gkz',
    accessToken: '4kJWXfnpCxtmJ3J-K_hhoRs-qp0aKZ3pwz11MPQhPc8',
})

export default function handler() {
    return client
        .getEntries()
        .then((entry: any) => entry)
        .catch((err: any) => console.log(err))
}
