module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.stockx.com', 'image.goat.com', 'files.stripe.com'],
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
