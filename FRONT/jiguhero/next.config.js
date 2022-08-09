/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    BASE_URL: process.env.BASE_URL,
  },
  swcMinify: true,
  webpack(config) {
		config.resolve.modules.push(__dirname); // 추가
		return config;
	}
}

module.exports = nextConfig
