/** @type {import('next').NextConfig} */

const env = require('./env.config')

const nextConfig = {
  env,
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
