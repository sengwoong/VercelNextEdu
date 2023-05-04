/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'links.papareact.com', 'img.freepik.com', 'cdn.sanity.io']
  },
  experimental:{
    appDir:true
  },
  webpack: (config, { isServer }) => {
    // Add a loader for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
  async redirects(){
    return[
      {
        source:'/',
        destination:'/home',
        permanent:true
      }
    ]
 
    
  },
  // async rewrites(){
  //   return[
  //     {
  //       source:'/pdfStudy/:username',
  //       destination:'/home/StudyRoom/:username'
     
  //     }
    // ]
 
    
  // }
};

module.exports = nextConfig;
