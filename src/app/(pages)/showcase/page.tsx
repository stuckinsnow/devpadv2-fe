import React from 'react';
import { getDocs } from '../../_api/getDocs';
import PaginationButton from '../../_components/PaginationButton';

import '../../_css/globals.scss';

import Link from 'next/link';
import About from '@/app/_components/About';

// import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ShowcasePage({ searchParams }: { searchParams: { page: string } }) {
    const page = parseInt(searchParams.page) || 1;
    const stringPage = page.toString();

    const discordThreadData = await getDocs('discordthreads', page, undefined, 'discordShowcase');
    const threads = discordThreadData?.DiscordCommunities.docs || [];
    const docData = discordThreadData.DiscordCommunities;
    const urlName: string = 'showcase';

    return (
        <React.Fragment>
            <About />
            <div className="content">
                <div className='rounded-lg flex flex-wrap justify-center mx-auto w-full box-border gap-4'>
                    {Array.isArray(threads) && threads.map((thread: any) => {
                        const { discordArray, discordID, discordFirstMessageLink, title } = thread;
                        const { discordInfo, discordIntro } = discordArray[0];
                        const guildID = discordInfo.guildID;
                        const lastMessageID = discordInfo.lastMessageID;

                        return (
                            <article key={thread.id} className={`${Array.isArray(title) ? title.join(' ') : 'aa'} w-full md:w-96 flex flex-col lg:flex-row p-3 mt-4 transition-all duration-75`}>


                                <img
                                    alt={discordIntro?.fileAttachments[0]?.name}
                                    src={discordIntro?.fileAttachments[0]?.url}
                                    width={300}
                                    height={200}
                                />

                                <div className='absolute flex flex-col p-4 justify-between text-amber-300 font-bold'>
                                    <Link href={`https://discord.com/channels/${guildID}/${discordID}/${lastMessageID}`}>
                                        <span className=' hover:text-gray-800 '>Discord Discussion</span>
                                    </Link>
                                    <Link href={discordFirstMessageLink || ''} target='_blank'>
                                        <span className=' hover:text-sky-700 '>Project Link</span>
                                    </Link>
                                </div>


                            </article>
                        );
                    })}
                </div>
                <PaginationButton searchParams={stringPage} docData={docData} paramCat={0} urlName={urlName} />
            </div>
        </React.Fragment>
    );
}
