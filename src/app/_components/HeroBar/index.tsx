import React from 'react';

import { Post, Media } from '../../../pl-types';

import './herobar.scss';

interface MediaExtended extends Media {
    url: string;
    excerpt: string;
}






const HeroBar: React.FC<{ postsWithMedia: any, posts: Post[] }> = ({ postsWithMedia, posts }) => {



    // console.log(postsWithMedia.Posts.docs[1].id);


    return (
        <div className='herobar '>












            <section className="herobar__container">
                <h1>Dummy writing</h1>
                <article className="herobar__content">


                    {postsWithMedia?.Posts.docs.map((post: Post, index: number) => {
                        console.log(post.id);
                        // console.log('media', postsWithMedia.Posts.docs[index]);

                        // console.log('pic', post.hero.media as MediaExtended);

                        return (
                            <div key={index}>
                                <div>happy</div>
                                <img className='card__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                    post.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />

                                <h2>{post.title}</h2>
                                <p>{post.hero.excerpt}</p>


                            </div>
                        );
                    })}

                    {/*             
                    <h3 className="herobar__title">Hero Bar</h3>
                    <p className="herobar__description">This is a hero bar component</p> */}
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