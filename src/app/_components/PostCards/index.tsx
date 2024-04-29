import React from 'react';
import Link from 'next/link';
import { Post, Media } from '../../../pl-types';
import { formatDateTime } from '../../_utilities/formatDateTime';
// import RichText from '../../_components/RichText';
import './postCards.scss';
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
        <div className='postcards'>

            {posts.map((post: Post) => (

                <div key={post.id} className={post.categories?.map((category: any) => category.title).join(' ') + ' card'}>
                    <div className='card__date'><span>{formatDateTime(post.publishedAt ?? '')}</span></div>
                    {post.hero.media && (
                        <img className='card__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (post.hero.media as MediaExtended)?.url}`} alt={post.title + 'card__hero-photo'} />
                    )}

                    <ul>
                        <div className='card__title'><Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}>
                            <h3>{post.title}</h3>
                        </Link></div>

                        {/* <li className='card__author'>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li> */}
                        <div className='card__excerpt'>{post.hero.excerpt}</div>

                        <li className='card__date--update'>Updated: {formatDateTime(post.updatedAt)}</li>

                        <li className='card__category'>Categories: {post?.categories?.map((category: any) => category.title).join(', ')}</li>


                    </ul>
                    {/* <RichText content={post.hero.richText} /> */}
                </div>
            ))}
        </div>
    );
};


export default PostCards;