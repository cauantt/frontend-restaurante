import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Adiciona o alias `@` para a pasta `src`
    config.resolve.alias['@'] = path.resolve('./src');
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com'], // Adiciona o domínio do Firebase para carregamento de imagens
  },
};

export default nextConfig;
