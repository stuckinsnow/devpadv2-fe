import Head from 'next/head';
import { getPage } from '../../_api/getPage';
import { PAGE } from '../../_graphql/pages';

import './page.scss';

import RichText from '@/app/_components/RichText';

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: { slug: string } }) {
    try {
        const data = await getPage(PAGE, params.slug);
        const page = data?.Pages?.docs[0] || null;

        // console.log('bobbbbbb', page.layout[0]?.columns[0]?.richText?.root);

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

        // console.log('bebop', page?.layout[0]?.blockType);

        return (
            <div>
                <Head>
                    <title>{page.title}</title>
                    <meta name="description" content="Your description here" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                {/* hero.richtext
                layout.columns.content.richtext */}

                <main>


                    <div key={page.id}>
                        <h2>{page.title}</h2>
                        {/* Log media URL */}
                        {/* <div>page slug img: {page.hero && page.hero.media && console.log(page.hero.media.url)}</div> */}

                        <div className='highlight'><h2>main hero image</h2></div>
                        {page.hero && page.hero.media && (
                            <img src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + page.hero.media.url}`} alt="Hero Image" />
                        )}

                    </div>

                    <div className='highlight'><h2>main hero richText</h2></div>
                    <RichText content={page.hero && page.hero.media && page.hero.richText} />

                    <div className='highlight'><h2>main content richText</h2></div>

                    {page?.layout?.map((layout: any, layoutIndex: number) => {

                        if (layout.blockType === 'content') {
                            return layout.columns.map((column: any, columnIndex: number) => (
                                column.richText && (
                                    <div className='highlight'><h3>content richText</h3>
                                        <RichText key={`${layoutIndex}-${columnIndex}`} content={column.richText} />
                                    </div>
                                )
                            ));
                        } else if (layout?.blockType == 'mediaBlock') {
                            return (
                                <div className='highlight'><h3>content mediaBlock</h3>
                                    <img key={layoutIndex} src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + layout?.media.url}`} />
                                </div>
                            )
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
