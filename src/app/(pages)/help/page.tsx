import React from 'react';
import { getDocs } from '../../_api/getDocs';

import '../../_css/globals.scss';
import './page.scss';
import Link from 'next/link';

async function renderCode(content: string) {
    const codeRegex = /<pre><code class="hljs.*?">([\s\S]*?)<\/code><\/pre>/g;
    const matches = content.split(codeRegex);
    const renderedContent = [];

    for (let i = 0; i < matches.length; i++) {
        const currentBlock = matches[i];

        if (i % 2 === 1) {
            renderedContent.push(`<pre class="hljs" ><code class="">${currentBlock}</code></pre>`);
        } else {
            renderedContent.push(`<p>${currentBlock}</p>`);
        }
    }

    return renderedContent.join('');
}

export const dynamic = 'force-dynamic';

export default async function HelpPage() {
    const discordThreadData = await getDocs('discordthreads', undefined, undefined, undefined);
    const threads = discordThreadData?.DiscordCommunities.docs || [];

    const renderedThreads = await Promise.all(
        (Array.isArray(threads) ? threads : []).map(async (thread: any) => {
            const rawContent = thread.discordCommunityJSON.intro.content;
            const renderedContent = await renderCode(rawContent);
            return {
                ...thread,
                renderedContent
            };
        })
    );

    return (
        <React.Fragment>
            <h1>Help</h1>
            <div className="content">
                <div className="rounded-lg flex flex-col mx-auto w-full max-w-screen-lg">
                    {renderedThreads.map((thread: any) => (
                        <article key={thread.id} className={Array.isArray(thread.title) ? thread.title.join(' ') + 'aa' : 'w-full md:w-5/12 md:m-2 lg:w-9/12 flex flex-col lg:flex-row p-3 mt-4 rounded-md transition-all duration-75 nice-shadow box-border'}>
                            <div className="lg:h-40 p-2 lg:p-0 box-border flex flex-col justify-around items-start text-left lg:ml-3 w-full h-full">
                                <div className='w-full' key={thread.discordID}>
                                    <Link className='w-full' href={`/help/${thread.slug}`}>
                                        <div>
                                            name
                                            <span className="capitalize"> {thread.discordCommunityJSON.intro.globalName}{thread.discordCommunityJSON.intro.authorID.toString().slice(-4)}</span>
                                        </div>
                                        <p>Title: {thread.title}</p>
                                        <div>Slug: {thread.slug}</div>
                                        {/* <div>content: <div dangerouslySetInnerHTML={{ __html: thread.renderedContent }} /></div> */}
                                        <div>message count: {thread.discordCommunityJSON.messageCount}</div>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}
