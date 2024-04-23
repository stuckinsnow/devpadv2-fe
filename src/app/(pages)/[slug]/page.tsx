import Head from 'next/head';
import { getPage } from '../../_api/getPage';
// import { PAGE } from '../../_graphql/pages';
import Image from 'next/image';
import { Page as PageType, Media } from '../../../pl-types';

import './page.scss';

import RichText from '@/app/_components/RichText';

export const dynamic = 'force-dynamic';

// things to fix include type and css classnames

export type MediaBlock = Extract<PageType['layout'][number], { blockType: 'mediaBlock' }>;

export default async function Page({ params }: { params: { slug: string } }) {
    try {
        const data = await getPage("pages", params.slug);


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

                    {page?.layout?.map((layout: Extract<PageType['layout'][number], { blockType: 'content' | 'mediaBlock' }>, layoutIndex: number) => {
                        if (layout.blockType === 'content') {
                            return layout.columns?.map((column, columnIndex) => (
                                column.richText && (
                                    <div className='ab3' key={`${layoutIndex}-${columnIndex}`}>
                                        <h3>content richText</h3>
                                        <RichText key={`${layoutIndex}-${columnIndex}`} content={column.richText} />
                                    </div>
                                )
                            ));
                        } else if (layout.blockType === 'mediaBlock') {
                            const layoutMedia = layout.media as Media;
                            return (
                                <div className='ab4' key={layoutIndex}>
                                    <h3>content mediaBlock</h3>
                                    <img className="mediablock-image" src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${layoutMedia.url}`} />
                                </div>
                            );

                        }
                        return null;
                    })}

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
