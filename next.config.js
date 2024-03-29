/** @type {import('next').NextConfig} */

const env = require('./env.config')

const nextConfig = {
  env,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/got7',
        permanent: false,
      },
    ]
  },
};

module.exports = nextConfig;
