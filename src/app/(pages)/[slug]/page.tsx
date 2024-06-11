import Head from 'next/head';
import { getDoc } from '../../_api/getDoc';
import Image from 'next/image';
import { Page as PageType } from '../../../pl-types';
import RichText from '@/app/_components/RichText';
import ContentAndMediaBlock from '../../_blocks/ContentAndMediaBlock';

import './page.scss';

import { formatDateTime } from '../../_utilities/formatDateTime';

export const dynamic = 'force-dynamic';

// things to fix include type and css classnames
// this page is unimportant because it's not currently used but I don't want to remove it yet

export type MediaBlock = Extract<PageType['layout'][number], { blockType: 'mediaBlock' }>;

export default async function Page({ params }: { params: { slug: string } }) {
    try {
        const data = await getDoc("pages", params.slug) as any;

        const rData = Array.isArray(data?.Pages.docs) ? data.Pages.docs[0] : undefined;

        const page = data?.Pages?.docs[0] || null;

        if (!page) {
            return (
                <div>
                    <Head>
                        <title>Page Not Found</title>
                    </Head>
                    <main>
                        <h1>Page Not Found</h1>
                        <p>The requested page could not be found.</p>
                    </main>
                </div>
            );
        }

        return (



            <div className="max-w-screen-xl mx-auto">

                <div className='m-auto max-w-screen-lg my-8 flex flex-col items-start'>
                    <h1 className='text-slate-800 scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl mt-2 capitalize'>{page.title}</h1>
                    {page.hero && page.hero.media &&
                        (
                            <Image
                                className="great-hero"
                                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${page.hero.media.url}`}
                                key={'heroImage'}
                                alt="Hero Image"
                                width={640}
                                height={480}
                                sizes="(max-width: 268px) 200px, 400px"
                            />
                        )}


                    <div className='text-slate-700'>Published: {formatDateTime(data?.publishedAt)}</div>
                    <div className='text-slate-700'>Updated: {formatDateTime(data?.updatedAt)}
                        <span> - {rData.populatedAuthors && rData.populatedAuthors.length > 0 ? rData.populatedAuthors[0].name : 'Admin'}</span>
                    </div>


                </div>

                <RichText content={rData.hero.richText} />
                <ContentAndMediaBlock rData={page} />


            </div>


        );
    } catch (error) {
        console.error('Error fetching page:', error);
        return (
            <div>
                <Head>
                    <title>Error</title>
                </Head>
                <main>
                    <h1>Error</h1>
                    <p>Failed to fetch page.</p>
                </main>
            </div>
        );
    }
}
