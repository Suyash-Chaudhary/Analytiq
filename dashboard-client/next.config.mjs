/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = {
        ...config.externals,
        redis: "undefined",
      };
    }
    return config;
  },
};

export default nextConfig;
