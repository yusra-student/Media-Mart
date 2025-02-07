/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.enforceExtension = false; // Enforces consistent case in file imports
      return config;
    },
      reactStrictMode: true,
      // experimental: {
      //   appDir: true, // Only if using the App Router
      // },
        images: {
            domains: ['cdn.sanity.io'], // Add this
          },
    };
    
    export default nextConfig;
    