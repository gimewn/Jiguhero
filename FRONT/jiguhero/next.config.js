/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/user/1' ,
        destination: `http://i7c105.p.ssafy.io:8080/user/1`,
      },
    ];
  },
  swcMinify: true,
  webpack(config) {
		config.resolve.modules.push(__dirname); // 추가
		return config;
	}
}

module.exports = nextConfig
