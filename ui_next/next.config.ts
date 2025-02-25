import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.krasilnikov.info',
            },
        ],
    },
};

export default nextConfig;
