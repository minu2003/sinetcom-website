import { INITIAL_BLOGS } from '@/components/blogs-page';
import { INITIAL_EVENTS } from '@/app/data/events';

export default function sitemap() {
  const baseUrl = 'https://www.sinetcom.lk';

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/solutions',
    '/sophos',
    '/sophos/mdr',
    '/sophos/endpoint',
    '/sophos/firewall',
    '/events',
    '/blogs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Blog routes
  const blogRoutes = INITIAL_BLOGS.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date().toISOString(), // In a real app, use blog.date or update format
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic Event routes (if any have dedicated pages, or if you use them as anchors in the future)
  // Assuming /events#[slug] or similar. If they don't have separate pages, skip them or just use /events.
  // We'll skip events if they are just popups on the events page to avoid 404s.

  return [...routes, ...blogRoutes];
}
