import React from 'react';
import { getDocs } from '../../_api/getDocs';
import { formatDateTime } from '../../_utilities/formatDateTime';

import '../../_css/globals.scss';
import './page.scss';
import Link from 'next/link';
import { Category } from '@/pl-types';

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
    const discordThreadData = await getDocs('discordthreads', undefined, undefined, 'discordHelp');
    const threads = discordThreadData?.DiscordCommunities.docs || [];
    const cats = await getDocs("cats", undefined, undefined, undefined);

    // console.log('bebop', cats.Categories.docs[0]);

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

    const numberToWordMap: Record<string, string> = {};

    if (Array.isArray(cats.Categories.docs)) {
        cats.Categories.docs.forEach((cat: Category) => {
            if (cat.discordHelpTag !== null && cat.discordHelpTag !== undefined) {
                numberToWordMap[cat.discordHelpTag] = cat.title?.toLowerCase() ?? '';
            }
        });
    }

    // console.log('numberToWordMap:', numberToWordMap);

    // console.log('bebop', discordThreadData.DiscordCommunities.docs[1].discordCommunityJSON.info.applied_tags);


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
                                        <h2 className=' text-3xl font-bold first-letter:capitalize text-gray-700' >{thread.title}</h2>
                                        <h3>
                                            <span className="capitalize font-bold text-gray-600"> {thread.discordCommunityJSON.intro.globalName}{thread.discordCommunityJSON.intro.authorID.toString().slice(-4)}</span>
                                        </h3>
                                        {/* <div>Slug: {thread.slug}</div> */}
                                        {/* <div>content: <div dangerouslySetInnerHTML={{ __html: thread.renderedContent }} /></div> */}
                                        <div className='text-gray-400 text-sm'>Comments: {thread.discordCommunityJSON.messageCount}</div>
                                        <div className="text-gray-400 font-bold text-sm"> <span>
                                            {formatDateTime(thread.createdAt)}
                                        </span>
                                            <span className='ml-2' >Message Count:
                                                {thread.discordCommunityJSON.info.messageCount}
                                            </span>
                                        </div>

                                        <div>
                                            {thread.discordCommunityJSON.info.applied_tags.map((tags: number, index: number) => {
                                                if (numberToWordMap.hasOwnProperty(tags)) {
                                                    return <span key={index} className="first:ml-0 ml-4  text-gray-500 text-sm"> {numberToWordMap[tags]} </span>
                                                }
                                                return null;
                                            })}
                                        </div>
                                        {/* <div>
                                            {thread.discordCommunityJSON.info.applied_tags.map((tags: number, index: number) => (
                                                <span key={index} className="first:ml-0 ml-4  text-gray-500 text-sm"> {numberToWordMap.hasOwnProperty(tags) ? numberToWordMap[tags] : null} </span>
                                            ))}
                                        </div> */}


                                        {/* {thread.discordCommunityJSON.info.applied_tags.map((tags: string) => (
                                            <span key={tags} className="text-gray-500 text-sm"> {tags} </span>

                                        ))
                                        } */}
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
