/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: async function () {
    return {
      "/": { page: "/home" },
    };
  },
};

export default nextConfig;
