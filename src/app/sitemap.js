import { INITIAL_BLOGS } from '@/app/data/blogs';
import { INITIAL_EVENTS } from '@/app/data/events';

export default async function sitemap() {
  try {
    const baseUrl = 'https://www.sinetcom.lk';

    // Static routes
    const routes = [
      '',
      '/about',
      '/contact',
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
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Return at least the base routes if dynamic part fails
    return [
      { url: 'https://www.sinetcom.lk', lastModified: new Date().toISOString() }
    ];
  }
}
