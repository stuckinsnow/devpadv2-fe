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

        // console.log(data);

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
                    <h1>Welcome to Next.js with TypeScript</h1>

                    <RichText content={page.hero && page.hero.media && page.hero.richText} />

                    {/* Display fetched page */}
                    <div key={page.id}>
                        <h2>{page.title}</h2>
                        {/* Log media URL */}
                        {/* <div>page slug img: {page.hero && page.hero.media && console.log(page.hero.media.url)}</div> */}

                        {page.hero && page.hero.media && (
                            <img src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + page.hero.media.url}`} alt="Hero Image" />
                        )}

                    </div>

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
