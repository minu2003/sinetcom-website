import EventDetailPage from '../../components/event-detail-page';

export function generateMetadata({ params }) {
    // We can fetch data here based on params.slug if we want dynamic titles
    return {
        title: 'Event Details | Sinetcom',
        description: 'Learn more about this upcoming Sinetcom event.',
    };
}

export default function EventRoute() {
    return <EventDetailPage />;
}
