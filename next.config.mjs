import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  pwa: {
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
      disableDevLogs: true,
    },
  },
};

export default withPWA(nextConfig);
