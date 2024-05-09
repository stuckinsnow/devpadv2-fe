import React from 'react';
import { PostsWithDocs, MediaExtended } from '../../../more-types';
import Link from 'next/link';

import './herobar.scss';

const HeroBar: React.FC<{ postsHighImpact: PostsWithDocs }> = ({ postsHighImpact }) => {

    const postsData = postsHighImpact.Posts.docs;

    return (
        <div className='herobar flex max-w-screen-xl mx-auto'>
            <article className="herobar__content w-8/12 flex p-2 text-left border border-gray-300 rounded mb-4 h-80">

                {Array.isArray(postsData) && postsData.map((post, index) => (


                    <div key={index} className='flex flex-row items-start'>
                        <div className='flex flex-col order-2 h-full min-h-full'>
                            <Link href={`/posts/${post.slug}`}><h2 className='font-bold'>{post.title}</h2></Link>
                            <p>{post.hero.excerpt}</p>
                        </div>

                        <img className='card__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                            post.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />
                    </div>

                ))}

            </article>

            <section className="herobar__container w-4/12 p-2 ml-4 border border-gray-300 rounded mb-4 h-80 ">
                <article className="">
                    <h2 className="font-bold">Hero Bar</h2>
                    <p className="">Welcome to my blog. I should probably write something coherent here.</p>
                </article>
            </section>

        </div>
    );
};

export default HeroBar;