import React from 'react';
import Link from 'next/link';
import { Post, Media } from '../../../pl-types';
import { formatDateTime } from '../../_utilities/formatDateTime';
// import RichText from '../../_components/RichText';
// import './postCards.scss';
import '../../_css/globals.scss';

// todo: add types
// line 23, 29

interface MediaExtended extends Media {
    url: string;
    excerpt: string;
}


const PostCards: React.FC<{ posts: Post[] }> = ({ posts }) => {

    // console.log(posts[2]?.hero.richText + posts[2]?.title);


    return (
        // <div className='postcards items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-4'>
        <div className='postcards items-start justify-center gap-6 rounded-lg'>

            {posts.map((post: Post) => (

                <article key={post.id} className={post.categories?.map((category: any) => category.title).join(' ') + ' card relative overflow-hidden rounded-lg border bg-background p-2 m-4'}>
                    <Link className="flex flex-row" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}>

                        <figure className='max-h-24'>
                            {post.hero.media && (
                                <img className='card__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                    post.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />
                            )}
                        </figure>
                        <div>

                            <div className='card__date'><span>{formatDateTime(post.publishedAt ?? '')}</span></div>
                            <ul>
                                <div className='card__title '>
                                    <h3 className='font-bold'>{post.title}</h3>
                                </div>
                                <li className='card__author'>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>
                                <div className='card__excerpt'>{post.hero.excerpt}</div>
                                <li className='card__date--update'>Updated: {formatDateTime(post.updatedAt)}</li>
                                <li className='card__category'>Categories: {post?.categories?.map((category: any) => category.title).join(', ')}</li>
                            </ul></div>
                        {/* <RichText content={post.hero.richText} /> */}</Link>
                </article>
            ))}
        </div>
    );
};


export default PostCards;