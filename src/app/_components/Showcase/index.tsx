import React from 'react';

import { getDocs } from '../../_api/getDocs';
import Link from 'next/link';

import { formatDateTime } from '../../_utilities/formatDateTime';

export default async function Showcase({ searchParams }: { searchParams: { page: string } }) {

    const page = parseInt(searchParams.page) || 1;

    const discordThreadData = await getDocs('discordthreads', page, undefined, 'discordShowcase');
    const threads = discordThreadData?.DiscordCommunities.docs || [];

    return (
        <React.Fragment>

            {Array.isArray(threads) && threads.slice(0, 1).map((thread: any) => {
                const { discordArray, discordID, discordFirstMessageLink, title } = thread;
                const { discordInfo, discordIntro } = discordArray[0];
                const guildID = discordInfo.guildID;
                const lastMessageID = discordInfo.lastMessageID;

                if (discordFirstMessageLink !== null && discordIntro.fileAttachments[0].url !== undefined) return (
                    <div key={thread.id} className='flex flex-col md:flex-row justify-center'>
                        <div className="herobar flex items-start w-fit md:w-9/12 p-3 nice-shadow rounded-md ">
                            <article key={thread.id} className={`${Array.isArray(title) ? title.join(' ') : 'aa'} flex flex-col md:flex-row   text-slate-800 w-full justify-between items-stretch `}>

                                <figure className="relative card__photo rounded-md lg:h-40 min-w-52 ">

                                    <img className='hidden lg:flex flex-col items-center justify-center w-52 md:h-40 bg-slate-900 text-white rounded-md z-10 bg-opacity-25' alt={discordIntro?.fileAttachments[0]?.name} src={discordIntro?.fileAttachments[0]?.url} />


                                </figure>

                                <div className='lg:h-auto p-2 lg:p-0 box-border flex flex-col justify-between items-start text-left lg:ml-3 w-full h-full' key={thread.discordID}>
                                    <div className=' flex flex-row w-full justify-between' >

                                        <h2 className='font-bold text-3xl w-full'><Link href={`https://discord.com/channels/${guildID}/${discordID}/${lastMessageID}`}>
                                            <span className=' hover:text-sky-700 '>Discuss in discord</span>
                                        </Link></h2>

                                        <div className='flex flex-row  justify-end text-sm w-full text-gray-800'> <Link href={discordFirstMessageLink || ''} target='_blank'><span className=' hover:text-sky-700 '>Project Link</span></Link></div>

                                    </div>

                                    <div className='text-gray-600 h-full '>
                                        <span className=''>{thread.excerpt}</span>
                                    </div>

                                    <div className=" text-sm flex flex-row justify-between w-full text-gray-800 ">
                                        <div className='grow ' >
                                            <span className='text-sm p-1 rounded-md bg-slate-50' >{formatDateTime(thread.discordArray[0].discordInfo.createdAt)}</span>
                                            - <span className="capitalize font-bold text-gray-600"> {thread.discordArray[0].discordIntro.globalName}
                                                {thread.discordArray[0].discordIntro.authorID.toString().slice(-4)}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                );

                else {
                    return <></>
                }
            })}

        </React.Fragment>
    );
};
