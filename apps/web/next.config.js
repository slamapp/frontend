/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@slam/ui'],
  compiler: {
    emotion: true,
  },
}
