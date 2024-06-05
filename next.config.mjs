/** @type {import('next').NextConfig} */
const nextConfig = {};

const CorsHeaders = [
    { key: "Access-Control-Allow-Credentials", value: "true" },
    { key: "Access-Control-Allow-Origin", value: "*" },
    {
      key: "Access-Control-Allow-Methods",
      value: "*",
    },
    {
      key: "Access-Control-Allow-Headers",
      value: "*",
    },
    {
      key: "Access-Control-Max-Age",
      value: "86400",
    },
];

nextConfig.headers = async () => {
    return [
        {
            source: '/api/:path*',
            headers: CorsHeaders,
        },
    ];

}

nextConfig.rewrites = async () => {
    return [
        // {
        // source: '/api/:path*',
        // destination: 'https://api.example.com/:path*',
        // },
    ];
}

export default nextConfig;
