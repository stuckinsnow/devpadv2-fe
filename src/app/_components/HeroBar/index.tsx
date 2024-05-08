import React from 'react';
import { PostsWithDocs, MediaExtended } from '../../../more-types';
import Link from 'next/link';

import './herobar.scss';

const HeroBar: React.FC<{ postsHighImpact: PostsWithDocs }> = ({ postsHighImpact }) => {

    const postsData = postsHighImpact.Posts.docs;

    return (
        <div className='herobar flex max-w-screen-xl mx-auto'>
            <article className="herobar__content w-8/12 flex">

                {Array.isArray(postsData) && postsData.map((post, index) => (
                    <Link key={index} className=' flex ' href={`/posts/${post.slug}`}>

                        <div className='flex order-2 flex-col'>
                            <h2>{post.title}</h2>
                            <p>{post.hero.excerpt}</p>
                        </div>

                        <img key={index} className='card__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                            post.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />

                    </Link>
                ))}

            </article>

            <section className="herobar__container w-4/12">
                <h2 className=''>Dummy writing</h2>
                <article className="herobar__content">
                    <h3 className="herobar__title">Hero Bar</h3>
                    <p className="herobar__description">This is a hero bar component</p>
                </article>
            </section>

        </div>
    );
};

export default HeroBar;