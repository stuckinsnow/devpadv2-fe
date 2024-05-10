import React from 'react';
import { PostsWithDocs, MediaExtended } from '../../../more-types';
import { formatDateTime } from '../../_utilities/formatDateTime';
import Link from 'next/link';

import './herobar.scss';

const HeroBar: React.FC<{ postsHighImpact: PostsWithDocs }> = ({ postsHighImpact }) => {

    const postsData = postsHighImpact.Posts.docs;

    return (
        <div className=" herobar ">

            {Array.isArray(postsData) && postsData.map((post, index) => (

                < div key={index} className=' flex' >
                    <div className='flex flex-col order-2 p-12 '>
                        <h1 className='font-bold text-3xl  '><Link href={`/posts/${post.slug}`}>{post.title}</Link></h1>
                        <p>by {post.authors[0].name} — {formatDateTime(post.publishedAt)}</p>
                        <p>{post.hero.excerpt}</p>
                    </div>

                    <img className='card__photo w-3/6 max-w-3/6 max-h-96' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                        post.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-768x1024.jpg')}`} alt={post.title + 'card__hero-photo'} />
                </div>

            ))
            }

        </div >

    );
};

export default HeroBar;