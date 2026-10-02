import { MetadataRoute } from 'next'
import { SERVICES } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mvgroups.online'
  const lastModified = new Date('2026-10-02')

  // ── Core pages ──
  const coreRoutes = [
    { path: '', priority: 1.0 },
    { path: '/staffing', priority: 0.9 },
    { path: '/management', priority: 0.9 },
    { path: '/services', priority: 0.9 },
    { path: '/about', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/careers', priority: 0.8 },
    { path: '/careers/status', priority: 0.5 },
    { path: '/gallery', priority: 0.7 },
    { path: '/updates', priority: 0.7 },
    { path: '/booking', priority: 0.8 },
    { path: '/build-your-event', priority: 0.8 },
    { path: '/staffing/services', priority: 0.7 },
    { path: '/management/services', priority: 0.7 },
  ].map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority,
  }))

  // ── Individual service pages ──
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // ── Legal / low-priority pages ──
  const legalRoutes = ['/privacy', '/terms'].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }))

  return [...coreRoutes, ...serviceRoutes, ...legalRoutes]
}
