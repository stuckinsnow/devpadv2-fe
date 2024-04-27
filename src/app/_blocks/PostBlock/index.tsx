import React from 'react';
import Link from 'next/link';
import { Post, Media } from '../../../pl-types';
import { formatDateTime } from '../../_utilities/formatDateTime';
import RichText from '../../_components/RichText';
import './postblock.scss';
import '../../_css/globals.scss';

// todo: add types
// line 23, 29

interface MediaExtended extends Media {
    url: string;
}


const PostBlock: React.FC<{ posts: Post[] }> = ({ posts }) => {
    console.log(posts[2]?.hero.richText + posts[2]?.title);

    return (
        <div className='postblock'>

            {posts.map((post: Post) => (

                <div key={post.id} className={post.categories?.map((category: any) => category.title).join(' ') + ' pb-post'}>

                    <ul>
                        <li className='pb-post__title'>{post.title}</li>
                        <li className='pb-post__date'>Update Date: {formatDateTime(post.updatedAt)}</li>
                        <li className='pb-post__date'>Publish Date: {formatDateTime(post.publishedAt ?? '')}</li>
                        <li className='pb-post__author'>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>
                        <li className='pb-post__category'>Categories: {post?.categories?.map((category: any) => category.title).join(', ')}</li>
                        <li className='pb-post__slug'><Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}>Slug: {post.slug}</Link></li>

                        {post.hero.media && (
                            <img className='pb-post__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (post.hero.media as MediaExtended)?.url}`} alt={post.title + 'pb-post__hero-photo'} />
                        )}

                        <div className='pb-post__excerpt'>This is the excerpt dummy writing and it gives me sadness but will spark joy</div>

                    </ul>
                    {/* <RichText content={post.hero.richText} /> */}
                </div>
            ))}
        </div>
    );
};


export default PostBlock;