/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['api.devpad.net', 'localhost'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "localhost",
            }
        ]
    }
};

export default nextConfig;



// next.config.js

