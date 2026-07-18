import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/admin/*',
        '/dashboard/',
        '/dashboard/*',
        '/api/'
      ],
    },
    sitemap: 'https://mvgroups.online/sitemap.xml',
  };
}
