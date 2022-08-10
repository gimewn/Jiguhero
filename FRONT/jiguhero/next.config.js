/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    BASE_URL: process.env.BASE_URL,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "http://localhost:3000/:path*",
  //       destination: "http://http://i7c105.p.ssafy.io:8080/:path*"
  //     }
  //   ]
  // },
  swcMinify: true,
  webpack(config) {
		config.resolve.modules.push(__dirname); // 추가
		return config;
	}
}

module.exports = nextConfig
