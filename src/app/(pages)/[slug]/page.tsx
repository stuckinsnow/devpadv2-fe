import Head from 'next/head';
import { getPage } from '../../_api/getPage';
import { PAGES } from '../../_graphql/pages';

export const dynamic = 'force-dynamic';

export default async function PagesPage() {
    try {
        const data = await getPage(PAGES);
        const pages = data?.Pages?.docs || [];

        console.log(data);

        return (
            <div>
                <Head>
                    <title>Next.js TypeScript Boilerplate</title>
                    <meta name="description" content="Your description here" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <h1>Welcome to Next.js with TypeScript</h1>
                    <p>Edit <code>pages/index.tsx</code> and save to reload.</p>

                    {/* Display fetched pages */}

                    {pages.map((page: any) => (
                        <div key={page.id}>
                            <h2>{page.title}</h2>
                            {/* Log media URL */}
                            {page.hero && page.hero.media && console.log(page.hero.media.url)}

                            {page.hero && page.hero.media && (
                                <img src={`http://localhost:3000${page.hero.media.url}`} alt="Hero Image" />
                            )}

                        </div>
                    ))}


                    {pages.map((page: any) => (
                        <div key={page.id}>
                            <h2>{page.title}</h2>
                            {/* Render other page data here */}
                        </div>
                    ))}
                </main>
            </div>
        );
    } catch (error) {
        console.error('Error fetching pages:', error);
        return (
            <div>
                <Head>
                    <title>Error</title>
                </Head>
                <main>
                    <h1>Error</h1>
                    <p>Failed to fetch pages.</p>
                </main>
            </div>
        );
    }
}
