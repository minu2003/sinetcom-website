import BlogDetailPage from '../../components/blog-detail-page';

export function generateMetadata({ params }) {
    return {
        title: 'Blog Article | Sinetcom',
        description: 'Read the latest insights from Sinetcom.',
    };
}

export default function BlogRoute() {
    return <BlogDetailPage />;
}
