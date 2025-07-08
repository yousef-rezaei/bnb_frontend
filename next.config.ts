import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**'
      },
       {
        protocol: 'http',
        hostname: '46.101.250.85',
        port: '1337',
        pathname: '/**'
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
