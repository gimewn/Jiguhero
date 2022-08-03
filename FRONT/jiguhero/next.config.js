/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
		config.resolve.modules.push(__dirname); // 추가
		return config;
	}
}

module.exports = nextConfig

const withImages = require('next-images')
module.exports = withImages()

module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    }
};