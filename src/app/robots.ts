import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/hesabim/'],
    },
    sitemap: 'https://hobitat.vercel.app/sitemap.xml',
  };
}

