module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.stockx.com', 'image.goat.com', 'files.stripe.com'],
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
