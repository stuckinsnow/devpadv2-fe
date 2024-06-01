import React from 'react';
import { getDocs } from '../../_api/getDocs';
import { formatDateTime } from '../../_utilities/formatDateTime';
import { renderCode } from '../../_utilities/renderCode';

import '../../_css/globals.scss';
import './page.scss';
import Link from 'next/link';
import { Category } from '@/pl-types';

export const dynamic = 'force-dynamic';

export default async function HelpPage() {
    const discordThreadData = await getDocs('discordthreads', undefined, undefined, 'discordHelp');
    const threads = discordThreadData?.DiscordCommunities.docs || [];
    const cats = await getDocs("cats", undefined, undefined, undefined);



    const renderedThreads = await Promise.all(
        (Array.isArray(threads) ? threads : []).map(async (thread: any) => {
            const rendered = await renderCode(thread.discordCommunityJSON.intro.content, true);
            return {
                renderedContent: rendered,
                ...thread,
            };
        }));

    const numberToWordMap: Record<string, string> = {};

    if (Array.isArray(cats.Categories.docs)) {
        cats.Categories.docs.forEach((cat: Category) => {
            if (cat.discordHelpTag !== null && cat.discordHelpTag !== undefined) {
                numberToWordMap[cat.discordHelpTag] = cat.title?.toLowerCase() ?? '';
            }
        });
    }

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

                                        <div className='text-gray-600' dangerouslySetInnerHTML={{ __html: thread.renderedContent }} />

                                        <div className='text-gray-400 text-sm'>Comments: {thread.discordCommunityJSON.messageCount}</div>

                                        <div className="text-gray-400 font-bold text-sm"> <span>
                                            {formatDateTime(thread.createdAt)}
                                        </span>
                                            <span className='ml-2' >Messages: {thread.discordCommunityJSON.info.messageCount}
                                            </span>
                                        </div>

                                        <div>
                                            {thread.discordCommunityJSON.info.applied_tags.map((tags: number, index: number) => {
                                                if (numberToWordMap.hasOwnProperty(tags)) {
                                                    return <span key={index} className="first:ml-0 ml-2  text-gray-500"> {numberToWordMap[tags]} </span>
                                                }
                                                return null;
                                            })}
                                        </div>

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
