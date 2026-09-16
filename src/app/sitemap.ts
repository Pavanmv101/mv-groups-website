import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mvgroups.online'

  const routes = [
    '',
    '/services',
    '/about',
    '/contact',
    '/careers',
    '/gallery',
    '/updates',
    '/booking',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-09-16'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const extraRoutes = [
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-09-16'),
    changeFrequency: 'weekly' as const,
    priority: 0.3,
  }))

  return [...routes, ...extraRoutes]
}
