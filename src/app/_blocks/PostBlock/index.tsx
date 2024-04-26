import React from 'react';
import Link from 'next/link';
import { Post, Media } from '../../../pl-types';
import { formatDateTime } from '../../_utilities/formatDateTime';
// import RichText from '../../_components/RichText';
import './postblock.scss';
import '../../_css/globals.scss';

// todo: add types
// line 23, 29

interface MediaExtended extends Media {
    url: string;
}

const PostBlock: React.FC<{ posts: Post[] }> = ({ posts }) => {

    return (
        <div className='postblock-container'>

            {posts.map((post: Post) => (

                <div key={post.id} className={post.categories?.map((category: any) => category.title).join(' ') + ' postblock-item'}>

                    <ul>
                        <li className='postblock-item__title'>{post.title}</li>
                        <li className='postblock-item__date'>Date: {formatDateTime(post.updatedAt)}</li>
                        <li className='postblock-item__author'>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>
                        <li className='postblock-item__category'>Categories: {post?.categories?.map((category: any) => category.title).join(', ')}</li>
                        <li className='postblock-item__slug'><Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}>Slug: {post.slug}</Link></li>

                        {post.hero.media && (
                            <img className='postblock-item__hero-photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (post.hero.media as MediaExtended)?.url}`} alt={post.title + '-hero-photo'} />
                        )}

                    </ul>
                    {/* <RichText content={post.hero.richText} /> */}
                </div>
            ))}
        </div>
    );
};


export default PostBlock;