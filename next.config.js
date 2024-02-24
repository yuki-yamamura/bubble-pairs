/** @type {import('next').NextConfig} */
const nextConfig = {
  // todo: set strict mode true when msw's rendering problem is fixed.
  reactStrictMode: false,
  experimental: {
    swcPlugins: [
      [
        'next-superjson-plugin',
        {
          excluded: [],
        },
      ],
    ],
  },
  redirects: () => {
    return [
      {
        source: '/settings/places',
        destination: '/settings',
        permanent: true,
      },
      {
        source: '/activities/:activityId/games',
        destination: '/activities/:activityId',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
