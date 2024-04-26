import React from 'react';
import Link from 'next/link';
import { Post, Media } from '../../../pl-types';
import { formatDateTime } from '../../_utilities/formatDateTime';
import RichText from '../../_components/RichText';

interface MediaExtended extends Media {
    url: string;
}

const PostBlock: React.FC<{ posts: Post[] }> = ({ posts }) => {

    return (
        <div className='post-block'>
            {posts.map((post: Post) => (
                <div key={post.id}>

                    <ul>
                        <li>{post.title}</li>
                        <li>Date: {formatDateTime(post.updatedAt)}</li>
                        <li>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>
                        <li>Categories: {post?.categories?.map((category: any) => category.title).join(', ')}</li>
                        <li><Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}>Slug: {post.slug}</Link></li>

                        {post.hero.media && (
                            <img src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (post.hero.media as MediaExtended)?.url}`} alt="Hero Image" />
                        )}

                    </ul>
                    {/* <RichText content={post.hero.richText} /> */}
                </div>
            ))}
        </div>
    );
};


export default PostBlock;