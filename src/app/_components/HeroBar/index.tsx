import React from 'react';
import { PostsWithDocs, MediaExtended } from '../../../more-types';
import { formatDateTime } from '../../_utilities/formatDateTime';
import Link from 'next/link';

import './herobar.scss';

const HeroBar: React.FC<{ postsHighImpact: PostsWithDocs }> = ({ postsHighImpact }) => {

    const postsData = postsHighImpact.Posts.docs;

    return (

        <div className='flex flex-col md:flex-row justify-center'>

            <div className="herobar flex w-fit md:w-9/12 p-3 nice-shadow rounded-md ">

                {Array.isArray(postsData) && postsData.map((post, index) => (

                    <div key={index} className='flex flex-col md:flex-row items-start text-slate-800 w-full justify-between'>
                        <div className='flex flex-col order-1 p-3 w-full md:w-3/6 items-start'>
                            <h2 className='font-bold text-3xl'><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2>
                            <p className='text-start' >by {post.authors[0]?.name} — {formatDateTime(post.publishedAt)}</p>
                            <p className='text-start '>{post.hero.excerpt}</p>
                        </div>

                        <img className='card__photo hidden md:flex h-40 w-60 lg:h-full lg:max-h-80 lg:w-3/6 rounded-lg' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                            post.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-768x1024.jpg')}`} alt={post.title + 'card__hero-photo'} />

                        {/* <div className="w-2/6 order-3 p-16 ">This will one day spark joy but today isn't that day obviously</div> */}
                    </div>

                ))
                }

            </div >

            {/* <div className='w-2/6 h-80 ml-4 nice-shadow rounded-md p-4'>This area is incomplete</div> */}

        </div>

    );
};

export default HeroBar;