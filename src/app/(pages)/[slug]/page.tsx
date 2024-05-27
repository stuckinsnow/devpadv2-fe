import Head from 'next/head';
import { getDoc } from '../../_api/getDoc';
import Image from 'next/image';
import { Page as PageType } from '../../../pl-types';

import './page.scss';

import RichText from '@/app/_components/RichText';
import ContentAndMediaBlock from '../../_blocks/ContentAndMediaBlock';

export const dynamic = 'force-dynamic';

// things to fix include type and css classnames
// this page is unimportant because it's not currently used but I don't want to remove it yet

export type MediaBlock = Extract<PageType['layout'][number], { blockType: 'mediaBlock' }>;

export default async function Page({ params }: { params: { slug: string } }) {
    try {
        const data = await getDoc("pages", params.slug);

        const dataType = data as any;
        const page = dataType?.Pages?.docs[0] || null;


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
            <div>
                <Head>
                    <title>{page.title}</title>
                    <meta name="description" content="Your description here" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>

                    <div key={page.id}>
                        <h2>{page.title}</h2>
                        <div className='highlight'><h2>main hero image</h2></div>
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

                    </div>

                    <div className='ab1'><h2>main hero richText</h2></div>
                    <RichText content={page.hero && page.hero.media && page.hero.richText} />
                    <div className='ab2'><h2>main content richText</h2></div>
                    <ContentAndMediaBlock rData={dataType.Pages.docs[0]} />


                </main>
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
