import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy &amp; Cookie Policy</h1>
      <p className="text-gray-600 mb-8">
        This page is a placeholder. Add your privacy and cookie policy content here.
      </p>
      <Link href="/contact" className="text-blue-600 hover:underline font-medium">
        ← Back to Contact
      </Link>
    </div>
  );
}
