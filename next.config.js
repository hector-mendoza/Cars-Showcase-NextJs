/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'cdn.imagin.studio'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
