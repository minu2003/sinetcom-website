import BlogDetailPage from '@/components/blog-detail-page';

import { INITIAL_BLOGS } from '@/app/data/blogs';

export async function generateMetadata({ params }) {
    const awaitedParams = await params;
    const slug = awaitedParams.slug;
    const blog = INITIAL_BLOGS.find((b) => b.slug === slug);

    if (!blog) {
        return {
            title: 'Blog Article Not Found',
            description: 'The requested blog article could not be found.',
        };
    }

    return {
        title: blog.title,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            url: `https://www.sinetcom.lk/blogs/${slug}`,
            images: [
                {
                    url: blog.heroImage?.src || '/assets/sinetcom-og.jpg',
                    width: 1200,
                    height: 630,
                    alt: blog.title,
                },
            ],
            type: 'article',
            publishedTime: blog.date,
            authors: [blog.authorName],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.excerpt,
            images: [blog.heroImage?.src || '/assets/sinetcom-og.jpg'],
        },
    };
}

export default async function BlogRoute({ params }) {
    return <BlogDetailPage />;
}
