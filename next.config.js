/** @type {import('next').NextConfig} **/
const nextConfig = {
  images: {
    loader: 'imgix',
    domains: [process.env.NEXTAUTH_URL],
    path: process.env.NEXTAUTH_URL,
    ignoreBuildErrors: true,
    output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    unoptimized: true,
    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts', 'html'],
    
  },
}

module.exports = nextConfig
