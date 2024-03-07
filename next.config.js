/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  optimizeFonts: false,
  async rewrites() {
    return [
      {
        source: "/(links|lnk|l)",
        destination: "/",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/debloat",
        destination:
          "https://raw.githubusercontent.com/kdpuvvadi/debloat-windows11/main/debloat.ps1",
        permanent: false,
      },
      {
        source: "/debloat11",
        destination:
          "https://raw.githubusercontent.com/kdpuvvadi/debloat-windows11/main/debloat.ps1",
        permanent: false,
      },
      {
        source: "/RemoveAppsList",
        destination:
          "https://raw.githubusercontent.com/kdpuvvadi/debloat-windows11/main/RemoveAppsList.json",
        permanent: false,
      },
      {
        source: "/installapps",
        destination:
          "https://raw.githubusercontent.com/kdpuvvadi/debloat-windows11/main/installapps.json",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
