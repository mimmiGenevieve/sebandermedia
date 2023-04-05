/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.ctfassets.net', 'sebandermedia.se'],
        unoptimized: true,
    },
    env: {
        space: '3x8meoim7gkz',
        accessToken: '4kJWXfnpCxtmJ3J-K_hhoRs-qp0aKZ3pwz11MPQhPc8',
        serviceID: 'service_eibqul7',
        templateID: 'order-inquiry',
        emaiJSToken: 'hHa6kbIOnuayN1wK6',
    },
};

module.exports = nextConfig;
