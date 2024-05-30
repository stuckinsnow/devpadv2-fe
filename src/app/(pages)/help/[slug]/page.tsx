import React from 'react';
import { getDoc } from '../../../_api/getDoc';

import '../../../_css/globals.scss';
import './../page.scss';

async function renderCode(content: string) {
    const codeRegex = /<pre><code class="hljs.*?">([\s\S]*?)<\/code><\/pre>/g;
    const matches = content.split(codeRegex);
    const renderedContent = [];

    for (let i = 0; i < matches.length; i++) {
        const currentBlock = matches[i];

        if (i % 2 === 1) {
            renderedContent.push(`<pre class="hljs p-4 overflow-auto" ><code class="">${currentBlock}</code></pre>`);
        } else {
            renderedContent.push(`<p class="text-gray-600 " >${currentBlock}</p>`);
        }
    }

    return renderedContent.join('');
}

async function renderThread(thread: any) {
    const rawContent = thread.discordCommunityJSON.intro.content;
    const renderedContent = await renderCode(rawContent); // Await renderCode here
    const paragraphs = rawContent.split('<br>').map((paragraph: string, index: number) => (
        <p key={index} className="mt-2 ">{paragraph}</p>
    ));

    const renderedMessages = await Promise.all(thread.discordCommunityJSON.messages.map(async (json: any) => {
        const rendered = await renderCode(json.content);
        return {
            renderedContent: rendered,
            ...json,
        };
    }));

    return {
        ...thread,
        rawContent,
        paragraphs,
        renderedContent, // Include renderedContent here
        renderedMessages,
    };
}

export const dynamic = 'force-dynamic';


export default async function UniqueHelpPage({ params }: { params: { slug: string } }) {
    const discordThreadData = await getDoc('discordthread', params.slug);
    const thread = discordThreadData?.DiscordCommunities.docs || [];

    const renderedThread = await Promise.all(
        Array.isArray(thread) ? thread.map(async (thread: any) => await renderThread(thread)) : []
    );

    console.log('bebop', discordThreadData.DiscordCommunities.docs);

    return (
        <React.Fragment>
            <h1>Help</h1>

            <div className="rounded-lg flex flex-col mx-auto w-full max-w-screen-lg">
                {renderedThread.map((thread: any) => (
                    <article key={thread.id} className={Array.isArray(thread.title) ? thread.title.join(' ') + ' ' : 'mx-auto w-full sm:w-9/12 flex flex-col lg:flex-row p-3 mt-4 rounded-md nice-shadow-2 box-border'}>
                        <div className="p-2 w-full">
                            <div key={thread.discordID} className=' '>
                                {/* <div>Slug: {thread.slug}</div> */}
                                <h1 className='text-lg text-lime-400 font-bold uppercase ' >{thread.title}</h1>
                                <h2>
                                    <span className="capitalize font-bold"> {thread.discordCommunityJSON.intro.globalName}{thread.discordCommunityJSON.intro.authorID.toString().slice(-4)}</span>
                                    <span className=" text-gray-600 "> - {new Date(thread.discordCommunityJSON.intro.createdAtDate).toLocaleString()}</span>
                                </h2>
                                <div><div dangerouslySetInnerHTML={{ __html: thread.renderedContent }} /></div>
                                {/* <div>{thread.discordCommunityJSON.messageCount}<span className='capitalise ' >messages</span></div> */}
                            </div>

                            <div className=" capitalize ">
                                {thread.renderedMessages.map((json: any, i: number) => (
                                    <div key={i} className="flex flex-col message-box mt-4 p-2 border-2  odd:bg-slate-50 even:bg-slate-100">
                                        <h2>
                                            <span className='font-bold' >{json.globalName}{json.authorID.toString().slice(-4)}</span>
                                            <span className='text-gray-600' > - {new Date(json.createdAtDate).toLocaleString()}</span>
                                        </h2>
                                        {/* <div>Attachments: {json.fileAttachments.length > 0 ? json.fileAttachments.join(', ') : '0'}</div> */}
                                        <div dangerouslySetInnerHTML={{ __html: json.renderedContent }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}

            </div>
        </React.Fragment>
    );
}
