import React from 'react';
import Link from 'next/link';
import { PostsWithDocs, MediaExtended } from '../../../more-types';
import { Category } from '../../../pl-types';
import { formatDateTime } from '../../_utilities/formatDateTime';
// import RichText from '../../_components/RichText';
import './postCards.scss';
import '../../_css/globals.scss';

const PostCards: React.FC<{ posts: PostsWithDocs }> = ({ posts }) => {

    // console.log(posts[2]?.hero.richText + posts[2]?.title);

    const postsData = posts.Posts.docs;

    if (!posts) {
        return <div>No posts available</div>;
    }


    return (
        <div className='postcards items-start justify-center gap-6 rounded-lg'>

            {Array.isArray(postsData) && postsData.map((post) => (

                <article key={post.id} className={post.categories?.map((category: Category) => category.title).join(' ') + ' card p-2 text-left border border-gray-300 rounded w-full mb-4'}>


                    {/* <figure className='max-h-24'>
                            {post.hero.media && (
                                <img className='card__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                    post.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />
                            )}
                        </figure> */}
                    <div>

                        <ul>
                            <div className='card__title '>
                                <Link className="" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}><h3 className='font-bold'>{post.title}</h3></Link>
                            </div>
                            <div className='card__excerpt'>{post.hero.excerpt}</div>
                            <li className='card__date--update'>Updated: {formatDateTime(post.updatedAt)}</li>
                            <li className='card__category'>Categories: {post?.categories?.map((category: Category) => category.title).join(', ')}</li>
                        </ul></div>
                    <div className='card__date'>
                        <span className=''>by {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : 'admin'}
                        </span> —
                        <span className=''> {formatDateTime(post.publishedAt ?? '')}</span></div>
                    {/* <div className='card__date'></div> */}
                    {/* <RichText content={post.hero.richText} /> */}
                </article>
            ))}
        </div>
    );
};


export default PostCards;