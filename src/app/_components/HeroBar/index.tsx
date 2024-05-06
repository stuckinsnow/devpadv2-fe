import React from 'react';
import { PostsWithDocs, MediaExtended } from '../../../more-types';

import './herobar.scss';

const HeroBar: React.FC<{ postsWithMedia: PostsWithDocs }> = ({ postsWithMedia }) => {

    const postsData = postsWithMedia.Posts.docs;

    return (
        <div className='herobar '>
            <section className="herobar__container">
                <h1>Dummy writing</h1>
                <article className="herobar__content">

                    {Array.isArray(postsData) && postsData.map((postsWithMedia, index) => (

                        <div key={index}>
                            <div>happy</div>
                            <img className='card__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                postsWithMedia.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={postsWithMedia.title + 'card__hero-photo'} />

                            <h2>{postsWithMedia.title}</h2>
                            <p>{postsWithMedia.hero.excerpt}</p>

                        </div>

                    ))}

                </article>
            </section>

            <section className="herobar__container">
                <h2>Dummy writing</h2>
                <article className="herobar__content">
                    <h3 className="herobar__title">Hero Bar</h3>
                    <p className="herobar__description">This is a hero bar component</p>
                </article>
            </section>

        </div>
    );
};

export default HeroBar;