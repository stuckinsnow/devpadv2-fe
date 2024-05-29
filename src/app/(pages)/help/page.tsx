import React from 'react';
import { getDocs } from '../../_api/getDocs';


export default async function HelpPage() {

    const discordThreadData = await getDocs("discordthreads", undefined, undefined, undefined);
    const threads = discordThreadData?.DiscordCommunities.docs;

    // console.log('bebop', threads[0].discordCommunityJSON.messages);

    // https://discord.com/api/v10/channels/1244807389660844093/threads/archived/public // get all archived threads
    // https://discord.com/api/v10/channels/1244807389660844093/messages // get all messages of channel
    // https://discord.com/api/v10/channels/1244807614924066826/messages // get all messages in thread id


    return (
        <React.Fragment>
            <h1>Help</h1>

            <div className='content'>

                <div className='postcards rounded-lg flex flex-wrap justify-center mx-auto w-full'>

                    <div className='postcards rounded-lg flex flex-wrap justify-center mx-auto w-full'>

                        {/* <PostCards posts={postsLowImpact} /> */}

                        {threads && Array.isArray(threads) ? threads.map((thread: any) => {

                            // console.log('content', thread.discordCommunityJSON.intro.content);

                            return (
                                <article key={thread.id} className={Array.isArray(thread.title) ? thread.title.join(' ') + ' card w-full md:w-5/12 md:m-2 lg:w-9/12 flex flex-col lg:flex-row p-3 mt-4 rounded-md transition-all duration-75 nice-shadow box-border' : ''}>


                                    <div className='lg:h-40 p-2 lg:p-0 box-border flex flex-col justify-around items-start text-left lg:ml-3 w-full h-full'><div key={thread.discordID}>
                                        <p>title {thread.title}</p>
                                        <div>slug {thread.slug}</div>
                                        <div>discord id {thread.discordID}</div>
                                        <div>content {thread.discordCommunityJSON.intro.content}</div>
                                    </div>

                                        {/* {Array.isArray(thread.discordCommunityJSON.messages) ? thread.discordCommunityJSON.messages.map((json) => {
                                            return (
                                                <div key={json.id} className='flex flex-col message-box bg-slate-800 text-fuchsia-400'>
                                                    <p>Content: {json.content}</p>
                                                    <p>Author ID: {json.authorID}</p>
                                                    <p>Author Name: {json.authorName}</p>
                                                    <p>Created At: {new Date(json.createdAtDate).toLocaleString()}</p>
                                                    <div>Attachments: {json.fileAttachments.length > 0 ? json.fileAttachments.join(', ') : 'None'}</div>
                                                </div>
                                            );
                                        }) : null} */}

                                    </div>

                                </article>
                            );
                        }) : null}


                    </div>
                </div>
            </div>

        </React.Fragment>
    );
}

