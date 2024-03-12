/** @type {import('next').NextConfig} */
const nextConfig = {
  // todo: set strict mode true when msw's rendering problem is fixed.
  reactStrictMode: false,
  redirects: () => {
    return [
      {
        source: '/settings/places',
        destination: '/settings',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
