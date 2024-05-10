import React from 'react';
import Link from 'next/link';
import { PostsWithDocs, MediaExtended } from '../../../more-types';
import { Category } from '../../../pl-types';
import { formatDateTime, formatDateTimePosts } from '../../_utilities/formatDateTime';
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
        <div className='postcards items-start justify-center gap-6 rounded-lg flex flex-wrap'>

            {Array.isArray(postsData) && postsData.map((post) => (

                <article key={post.id} className={post.categories?.map((category: Category) => category.title).join(' ') + ' card flex items-start p-2 text-left rounded mb-4 w-full'}>

                    <div className='flex flex-col bg-black bg-opacity-10 py-2 w-32 mx-4'>

                        <span className='block clear-both font-bold uppercase leading-6'>
                            {formatDateTimePosts(post.publishedAt, 'month')}
                        </span>
                        <span className='text-3xl'>
                            {formatDateTimePosts(post.publishedAt, 'day')}
                        </span>
                        <span className='text-sm'>
                            {formatDateTimePosts(post.publishedAt, 'year')}
                        </span>

                        {/* <div className='card__date'>
                            <span className=''>— {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : 'admin'}
                            </span>
                        </div> */}
                    </div>


                    {/* <figure className='max-h-24'>
                            {post.hero.media && (
                                <img className='card__photo' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                    post.hero.media as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />
                            )}
                        </figure> */}
                    <div className='w-full'>


                        <div className='card__title '>
                            <Link className="" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}><h3 className='font-bold'>{post.title}</h3></Link>
                        </div>
                        <div className='card__excerpt'>{post.hero.excerpt}</div>
                        <div className='card__date--update'>Updated: {formatDateTime(post.updatedAt)}</div>
                        <div className='card__category'>Categories: {post?.categories?.map((category: Category) => category.title).join(', ')}</div>



                    </div>

                    {/* <div className='card__date'></div> */}
                    {/* <RichText content={post.hero.richText} /> */}
                </article>
            ))}
        </div>
    );
};


export default PostCards;