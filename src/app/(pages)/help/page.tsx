import React from 'react';
import { getDocs } from '../../_api/getDocs';
import { codeToHtml } from 'shiki';
import '../../_css/globals.scss';


async function renderCode(content: string, lang = 'javascript', theme = 'catppuccin-macchiato') {
    const codeRegex = /<pre><code.*?>([\s\S]*?)<\/code><\/pre>/g;
    const matches = content.split(codeRegex);
    const renderedContent = [];

    for (let i = 0; i < matches.length; i++) {
        if (i % 2 === 0) {
            renderedContent.push(matches[i]);
        } else {

            const codeBlock = `<pre><code class="${lang}">${matches[i]}</code></pre>`;
            renderedContent.push(codeBlock);

            // const html = await codeToHtml(matches[i], { lang, theme });
            // renderedContent.push(html);
        }
    }

    return renderedContent;
}

export const dynamic = 'force-dynamic';

export default async function HelpPage() {
    const discordThreadData = await getDocs('discordthreads', undefined, undefined, undefined);
    const threads = discordThreadData?.DiscordCommunities.docs;

    const renderedMessages: { [key: string]: any[] } = {};

    if (Array.isArray(threads)) {
        for (let thread of threads) {
            if (Array.isArray(thread.discordCommunityJSON.messages)) {
                const renderPromises = thread.discordCommunityJSON.messages.map(async (json: any) => {
                    const rendered = await renderCode(json.content);
                    return {
                        renderedContent: rendered,
                        ...json,
                    };
                });
                renderedMessages[thread.id] = await Promise.all(renderPromises);
            }
        }
    }


    return (
        <React.Fragment>
            <h1>Help</h1>
            <div className="content">
                <div className="rounded-lg flex flex-col mx-auto w-full max-w-screen-lg">
                    {Array.isArray(threads) ? threads.map((thread: any) => {
                        const nameID = thread.discordCommunityJSON.intro.authorID.toString().slice(-4);
                        const globalNameFixed = thread.discordCommunityJSON.intro.globalName + nameID;
                        const rawContent = thread.discordCommunityJSON.intro.content;
                        const paragraphs = rawContent.split('<br>').map((paragraph: string, index: number) => (
                            <p key={index} className="mt-2">{paragraph}</p>
                        ));

                        return (
                            <article key={thread.id} className={Array.isArray(thread.title) ? thread.title.join(' ') + 'aa' : 'mt-4'}>
                                <div className="p-2 border-solid border-2 border-slate-800">
                                    <div key={thread.discordID}>
                                        <div>
                                            name
                                            <span className="capitalise"> {globalNameFixed}</span>
                                        </div>
                                        <p>Title: {thread.title}</p>
                                        <div>Slug: {thread.slug}</div>
                                        <div>content {paragraphs} </div>
                                        <div>message count {thread.discordCommunityJSON.messageCount}</div>
                                    </div>
                                    <div>
                                        {renderedMessages[thread.id] ? renderedMessages[thread.id].map((json, i) => (
                                            <div key={i} className="flex flex-col message-box bg-slate-800 text-fuchsia-400 mt-4">
                                                <div dangerouslySetInnerHTML={{ __html: json.renderedContent.join('') }} />
                                                <p>Author Name: {json.globalName}{json.authorID.toString().slice(-4)}</p>
                                                <p>Created At: {new Date(json.createdAtDate).toLocaleString()}</p>
                                                <div>Attachments: {json.fileAttachments.length > 0 ? json.fileAttachments.join(', ') : 'None'}</div>
                                            </div>
                                        )) : null}
                                    </div>
                                </div>
                            </article>
                        );
                    }) : null}
                </div>
            </div>
        </React.Fragment>
    );
}
