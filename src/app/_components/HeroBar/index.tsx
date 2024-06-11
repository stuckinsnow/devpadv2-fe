import React from 'react';
import { PostsWithDocs, MediaExtended } from '../../../more-types';
import { formatDateTime } from '../../_utilities/formatDateTime';

import Image from 'next/image';

import Link from 'next/link';

import './herobar.scss';

const HeroBar: React.FC<{ postsHighImpact: PostsWithDocs }> = ({ postsHighImpact }) => {

    const postsData = postsHighImpact.Posts.docs;

    return (

        <div className='flex flex-col md:flex-row justify-center'>

            <div className="herobar flex items-start w-fit md:w-9/12 p-3 nice-shadow rounded-md ">

                {Array.isArray(postsData) && postsData.map((post, index) => (

                    <div key={index} className='flex flex-col md:flex-row items-start text-slate-800 w-full justify-between'>
                        <div className='flex flex-col order-1 p-3 w-full items-start'>
                            <h2 className='font-bold text-3xl'><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2>
                            <p className='text-start' >by {post.authors[0]?.name} — {formatDateTime(post.publishedAt)}</p>
                            <p className='text-start '>{post.hero.excerpt}</p>
                        </div>

                        <figure className="relative card__photo flex flex-col md:flex-row min-h-80 w-full md:w-5/6 rounded-lg">

                            <Image
                                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (post.hero.media as MediaExtended)?.url}`}
                                alt={post.title + 'card__hero-photo'}
                                fill
                                quality={80}

                                style={{ objectFit: "cover" }}
                                objectPosition={`${post.hero.media?.focalX}% ${post.hero.media?.focalY}%`}
                            />

                        </figure>
                    </div>

                ))
                }

            </div >

        </div>

    );
};

export default HeroBar;