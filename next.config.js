/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['xn--b1afb6bcb.xn----8sbdnscebbikxeegtdnsb7i.xn--p1ai']
  },
  reactStrictMode: false,
};
