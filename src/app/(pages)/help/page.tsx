import React from 'react';
import { getDocs } from '../../_api/getDocs';
import { formatDateTime, formatDateTimePosts } from '../../_utilities/formatDateTime';
import PaginationButton from '../../_components/PaginationButton';

import '../../_css/globals.scss';
import './page.scss';
import Link from 'next/link';
import { Category } from '../../../pl-types';
import { PostsWithDocs } from '@/more-types';



export const dynamic = 'force-dynamic';


// const page = parseInt(searchParams.page) || 1;
// const categoryId = parseInt(searchParams.category) || 0;

// const postsLowImpact = await getDocs("posts", page, categoryId, "lowImpact");
// const postsHighImpact = await getDocs("postshighimpact", undefined, undefined, undefined);
// // const postsFeatured = await getDocs("posts", 1, categoryId, "featured");

// const cats = await getDocs("cats", undefined, undefined, undefined);

// const paramCat: number = categoryId;


export default async function HelpPage({ searchParams }: { searchParams: { page: string } }) {
    const page = parseInt(searchParams.page) || 1;
    const stringPage = page.toString();
    const cats = await getDocs("cats", undefined, undefined, undefined);

    const discordThreadData = await getDocs('discordthreads', page, undefined, 'discordHelp');
    const threads = discordThreadData?.DiscordCommunities.docs || [];
    const docData = discordThreadData.DiscordCommunities;
    const urlName: string = 'help';

    const numberToWordMap: Record<string, string> = {};

    if (Array.isArray(cats.Categories.docs)) {
        cats.Categories.docs.forEach((cat: Category) => {
            if (cat.discordHelpTag !== null && cat.discordHelpTag !== undefined) {
                numberToWordMap[cat.discordHelpTag] = cat.title || '';
            }
        });
    }

    // console.log(discordThreadData.DiscordCommunities);


    return (

        <div className="content">

            <div className='rounded-lg flex flex-wrap justify-center mx-auto w-full'>

                {/* maybe redundant  */}

                {Array.isArray(threads) && threads.map((thread: any) => (
                    <article key={thread.id} className={Array.isArray(thread.title) ? thread.title.join(' ') + 'aa' : 'aa w-full md:w-5/12 md:m-2 lg:w-9/12 flex flex-col lg:flex-row p-3 mt-4 rounded-md transition-all duration-75 nice-shadow box-border'}>

                        <figure className='relative card__photo rounded-md lg:h-40 min-w-52 '>

                            <figcaption className='hidden lg:flex flex-col items-center justify-center w-52 md:h-40 bg-slate-900 text-white rounded-md z-10 bg-opacity-25'>

                                <span className='block clear-both font-bold uppercase leading-6'>{formatDateTimePosts(thread.createdAt, 'month')}</span>
                                <span className='text-3xl'>{formatDateTimePosts(thread.createdAt, 'day')}</span>
                                <span className='text-sm'>{formatDateTimePosts(thread.createdAt, 'year')}</span>

                            </figcaption>

                        </figure>


                        <div className='lg:h-auto p-2 lg:p-0 box-border flex flex-col justify-between items-start text-left lg:ml-3 w-full h-full' key={thread.discordID}>
                            <div className=' flex flex-row w-full justify-between' >


                                <Link className='w-full' href={`/help/${thread.slug}`}><h2 className=' text-3xl font-bold first-letter:capitalize text-gray-700' >{thread.title}</h2>
                                </Link>

                                <div className='flex flex-row  justify-end text-sm w-full text-gray-800'>
                                    {thread.discordArray[0].discordInfo.applied_tags.map((tags: number, index: number) => {
                                        if (numberToWordMap.hasOwnProperty(tags)) {
                                            return <span key={index} className="first:ml-0 text-gray-500 text-sm p-1 "> {numberToWordMap[tags]} </span>
                                        }
                                        return null;
                                    })}
                                </div>

                            </div>

                            <div className='text-gray-600 h-full '>
                                <span className=''>{thread.excerpt}</span>

                            </div>

                            {/* <div className='text-gray-400 text-sm'>Comments: {thread.discordArray[0].discordInfo.messageCount}</div> */}

                            <div className=" text-sm flex flex-row justify-between w-full text-gray-800 ">

                                <div className='grow ' >

                                    <span className='text-sm p-1 rounded-md bg-slate-50' >{formatDateTime(thread.createdAt)}</span>
                                    - <span className="capitalize font-bold text-gray-600"> {thread.discordArray[0].discordIntro.globalName}
                                        {thread.discordArray[0].discordIntro.authorID.toString().slice(-4)}</span>

                                </div>

                                {/* <span className='' >Messages: {thread.discordArray[0].discordInfo.messageCount}</span> */}
                                <span className='text-sm p-1 rounded-md bg-slate-50' >Replies: {thread.discordMessageCount} </span>
                            </div>

                        </div>

                    </article>
                ))}</div>

            <PaginationButton searchParams={stringPage} docData={docData} paramCat={0} urlName={urlName} />

        </div>

    );
}
