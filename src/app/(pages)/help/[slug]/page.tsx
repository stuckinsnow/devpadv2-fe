import React from 'react';
import { getDoc } from '../../../_api/getDoc';
import { renderCode } from '../../../_utilities/renderCode';

import '../../../_css/globals.scss';
import './../page.scss';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function renderThread(thread: any) {
    const rawContent = thread.discordArray[0].discordContent;
    const renderedContent = await renderCode(rawContent, false);

    const paragraphs = rawContent.split(' <br> ').map((paragraph: string, index: number) => (
        <p key={index} className="mt-2 ">{paragraph}</p>
    ));

    const renderedMessages = await Promise.all(thread.discordArray[0].discordMessages.map(async (json: any) => {
        const rendered = await renderCode(json.content, false);
        return {
            renderedContent: rendered,
            ...json,
        };
    }));

    return {
        ...thread,
        rawContent,
        paragraphs,
        renderedContent,
        renderedMessages,
    };
}

export default async function UniqueHelpPage({ params }: { params: { slug: string } }) {
    const discordThreadData = await getDoc('discordthread', params.slug);
    const thread: any = discordThreadData?.DiscordCommunities.docs || [];

    const renderedThread = await Promise.all(
        Array.isArray(thread) ? thread.map(async (singleThread: any) => await renderThread(singleThread)) : []
    );

    const guildID = thread[0].discordArray[0].discordInfo.guildID;
    const discordID = thread[0].discordID;
    const lastMessageID = thread[0].discordArray[0].discordInfo.lastMessageID;
    const theOriginalID = thread[0].discordArray[0].discordIntro.authorID;

    return (
        <React.Fragment>
            <div className="rounded-lg flex flex-col mx-auto w-full max-w-screen-lg ">
                <div key={discordID} className="p-2 w-full">
                    <h1 className=' p-2 text-slate-800 scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl mt-2 capitalize'>{thread[0].title}</h1>

                    <div className=' p-2 text-slate-700'>
                        <span className="capitalize font-bold">{thread[0].discordArray[0].discordIntro.globalName}{theOriginalID.toString().slice(-4)}  </span>
                        <span className="text-gray-600"> - {new Date(thread[0].discordArray[0].discordIntro.createdAtDate).toLocaleString()}</span>
                    </div>

                    <div className='p-2 border-2 rounded-md border-transparent '>

                        <div dangerouslySetInnerHTML={{ __html: renderedThread[0].renderedContent }} />

                    </div>

                    <div className=' text-xl font-bold text-slate-800 hover:text-amber-800 text-center uppercase transition-all duration-75' >

                        <Link href={'https://discord.com/channels/' + guildID + '/' + discordID + '/' + lastMessageID}>Post Comment</Link>

                    </div>

                    <div className="capitalize pl-16 ">
                        {renderedThread[0].renderedMessages.map((json: any, i: number) => (

                            <div key={i} className={json.authorID === theOriginalID ? ' flex flex-col message-box mt-4 p-2 border-2 rounded-md border-slate-200' :
                                ' flex flex-col message-box mt-4 p-2 border-2 rounded-md border-slate-50 '}>
                                <h2>
                                    <span className='font-bold'>{json.globalName}{json.authorID.toString().slice(-4)}</span>
                                    <span className='text-gray-600'> - {new Date(json.createdAtDate).toLocaleString()}</span>
                                </h2>
                                <div dangerouslySetInnerHTML={{ __html: json.renderedContent }} />

                            </div>
                        ))}

                    </div>
                </div>
            </div>


        </React.Fragment>
    );
}
