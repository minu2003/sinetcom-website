'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { INITIAL_BLOGS } from './blogs-page';
import { colors } from './root';
import Link from 'next/link';
import Image from 'next/image';

const ImagePlaceholder = ({ label, className }) => (
    <div className={`relative bg-gray-100 overflow-hidden flex items-center justify-center border-2 border-dashed border-gray-300 ${className}`}>
        <span className="text-gray-400 font-medium whitespace-nowrap px-4">{label}</span>
    </div>
);

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;

    const blog = INITIAL_BLOGS.find((b) => b.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center pt-[var(--navbar-height,80px)]">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog not found</h1>
                <button
                    onClick={() => router.push('/blogs')}
                    className="px-6 py-2 rounded-lg text-white font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                >
                    Back to Blogs
                </button>
            </div>
        );
    }

    const getInnerImage = (index) => blog.innerImages ? blog.innerImages[index] : null;

    return (
        <div className="pt-[var(--navbar-height,80px)] bg-white min-h-screen font-sans">

            {/* 1. Hero Header Section */}
            <section className="relative w-full h-[55vh] min-h-[400px] flex flex-col justify-between pb-16 pt-8 px-4 sm:px-6 lg:px-12 xl:px-24">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    {blog.heroImage ? (
                        <Image
                            src={blog.heroImage}
                            alt={blog.title}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-800" />
                    )}
                    {/* Subtle overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Top: Back Button */}
                <div className="relative z-10 w-full mb-auto mt-4">
                    <Link href="/blogs" className="inline-flex items-center gap-2 text-white hover:text-gray-200 text-sm font-semibold transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Back to all blogs
                    </Link>
                </div>

                {/* Bottom: Blog Title */}
                <div className="relative z-10 w-full lg:w-3/4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15]"
                    >
                        {blog.title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex items-center gap-3 text-white/90 text-sm font-medium"
                    >
                        <span>Share</span>
                        <a href="#" className="hover:text-blue-400 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
                        <a href="#" className="hover:text-blue-500 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-1.332 0-2.5-1.168-2.5-2.501s1.168-2.501 2.5-2.501 2.5 1.168 2.5 2.501-1.168 2.501-2.5 2.501zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                    </motion.div>
                </div>
            </section>

            {/* 2. Main Article Content Container */}
            <section className="bg-gray-50/50 py-16">
                <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Meta Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-200 pb-8 mb-10">
                        {/* Author Info */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                                {blog.authorImage ? (
                                    <Image src={blog.authorImage} alt={blog.authorName} width={56} height={56} className="object-cover w-full h-full" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-xl">
                                        {blog.authorName?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <div className="text-gray-900 text-sm">
                                    <span className="font-semibold">{blog.authorName}</span>
                                    {blog.authorRole && (
                                        <>
                                            <span className="mx-1.5 text-gray-400">,</span>
                                            <span className="text-gray-600">{blog.authorRole}</span>
                                        </>
                                    )}
                                </div>
                                <div className="text-gray-400 text-sm mt-0.5">
                                    Read time: {blog.readTime || '5 mins'}
                                </div>
                            </div>
                        </div>

                        {/* Date & Categories */}
                        <div className="flex items-center flex-wrap gap-x-6 gap-y-3 lg:border-l lg:border-gray-200 lg:pl-8">
                            <div className="font-bold text-gray-900 text-base">
                                {blog.date}
                            </div>
                            <div className="hidden lg:block w-[1px] h-10 bg-gray-200" />
                            <div className="flex flex-col text-xs font-bold text-gray-900 gap-1.5">
                                <div className="flex items-center gap-2">
                                    <span>Energy, Utilities ...</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Events</span>
                                    <span className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[10px]">+ 3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prose Article */}
                    <article className="prose prose-lg md:prose-xl max-w-[900px] mx-auto text-gray-700 font-sans leading-relaxed">

                        <p className="font-semibold italic text-xl text-gray-900 mb-6">
                            "Houston, we might have a problem."
                        </p>

                        <p className="mb-6">
                            That's how I opened the session at <span className="font-bold text-[#8b5cf6] underline decoration-[#8b5cf6]">Industrial X Unleashed</span>. Because while AI is reshaping every industry, it can't run on promises alone. <strong>AI needs power</strong> - a lot of it.
                        </p>

                        {/* Right-floated Image */}
                        <div className="float-right ml-8 mb-6 mt-2 w-full max-w-[450px]">
                            {getInnerImage(0) ? (
                                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-sm">
                                    <Image src={getInnerImage(0)} alt="AI Event Presentation" fill className="object-cover" />
                                </div>
                            ) : (
                                <ImagePlaceholder label="Right-aligned Image" className="aspect-[4/3] rounded-sm w-full" />
                            )}
                        </div>

                        <p className="mb-6">
                            In the next five years, global electricity demand is projected to rise by 50 percent. Data-center growth, electrification of transport and industry, and the surge of AI computation are putting unprecedented pressure on grids that are already stretched thin.
                        </p>

                        <p className="mb-8">
                            The truth is simple: <strong>the AI revolution will stall without an energy revolution to power it.</strong>
                        </p>

                        <h2 className="text-3xl font-medium text-gray-800 mb-4 clear-none">The Scale of the Challenge</h2>

                        <p className="mb-6">
                            As I told the audience, the issue isn't theoretical. It's visible in brownouts in California, winter grid failures in Texas, and long waiting times for new connections worldwide.
                        </p>

                        <p className="mb-6 clear-right">
                            We're reshoring manufacturing, electrifying vehicles, and fuelling vast AI infrastructure - all at once. The world needs more power, cleaner power, and smarter grids to move it.
                        </p>

                        <p className="mb-8">
                            That's why IFS brought together two of the companies best positioned to solve this challenge: <strong>Microsoft</strong> and <span className="font-bold text-[#8b5cf6] underline decoration-[#8b5cf6]">Siemens</span>.
                        </p>

                        <h2 className="text-3xl font-medium text-gray-800 mb-4">All-In on Energy: Microsoft's Perspective</h2>

                        <p className="mb-6">
                            <strong>Darryl Willis</strong>, Corporate Vice President for Energy & Resources Industry at Microsoft, joined me on stage and didn't mince words.
                        </p>

                        {/* Left-floated Image */}
                        <div className="float-left mr-8 mb-6 mt-2 w-full max-w-[450px]">
                            {getInnerImage(1) ? (
                                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-sm">
                                    <Image src={getInnerImage(1)} alt="Panel Discussion" fill className="object-cover" />
                                </div>
                            ) : (
                                <ImagePlaceholder label="Left-aligned Image" className="aspect-[4/3] rounded-sm w-full" />
                            )}
                        </div>

                        <p className="mb-6 text-gray-600 font-medium italic relative">
                            "It's going to take every type of energy we can put our hands on to deliver on the promise of artificial intelligence."
                        </p>

                        <p className="mb-6">
                            Wind, solar, nuclear, natural gas, geothermal - even next-generation hydrogen. Darryl called this moment <em>"an all-in energy economy,"</em> driven by partnerships.
                        </p>

                        <p className="mb-6">
                            He described how Microsoft's AI ambitions depend on resilient, diversified power:
                        </p>

                        <p className="mb-6 text-gray-600 font-medium italic">
                            "We need energy for AI, but we also need AI for energy."
                        </p>

                        <p className="mb-6 clear-left">
                            Microsoft is investing heavily to make that a reality - spending $80 billion this year alone on data-center infrastructure, all powered by carbon-free sources. AI models are already helping to monitor fugitive emissions, optimise wind and solar operations, and reduce emissions in steel and cement production.
                        </p>

                    </article>
                </div>
            </section>
        </div>
    );
}
