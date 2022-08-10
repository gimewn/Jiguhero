/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
  env:{
    BASE_URL: process.env.BASE_URL,
  },
=======
  // async rewrites() {
  //   return [
  //     {
  //       source: "http://localhost:3000/:path*",
  //       destination: "http://http://i7c105.p.ssafy.io:8080/:path*"
  //     }
  //   ]
  // },
>>>>>>> c31e7ec91581cbbd432e8682b10193105f1b2a37
  swcMinify: true,
  webpack(config) {
		config.resolve.modules.push(__dirname); // 추가
		return config;
	}
}

module.exports = nextConfig
