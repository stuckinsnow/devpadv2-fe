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
        <div className='postcards rounded-lg flex flex-wrap items-start mx-auto'>

            {Array.isArray(postsData) && postsData.map((post) => (



                <article key={post.id} className={post.categories?.map((category: Category) => category.title).join(' ') + ' card flex flex-row text-left box-content w-11/12 transition-all duration-200 hover:scale-105'}>



                    <figure className='flex flex-col py-2 mx-4'>
                        {post.hero.lowImpactMedia && (
                            <img className='card__photo rounded-t-md max-h-44' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                post.hero.lowImpactMedia as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />
                        )}
                    </figure>

                    <div className='w-full mt-2'>


                        <div className='card__title font-bold text-gray-600 text-xl hover:text-amber-800 transition-all duration-200'>
                            <Link className="" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}><h3 className=''>{post.title}</h3></Link>
                        </div>
                        <div className='card__excerpt mt-4 text-gray-500 '>{post.hero.excerpt}</div>



                        <div className='flex flex-row justify-between w-full text-gray-700 mt-2'>
                            <span className='card__date'>Published: {formatDateTime(post.publishedAt)}</span>
                            {/* <span className='card__date--update'>Updated: {formatDateTime(post.updatedAt)}</span> */}
                            <span>{post?.categories?.map((category: Category) => category.title).join(', ') || ' No Category'}</span>
                        </div>




                    </div>

                    {/* <div className='flex flex-col w-32 '>


                        <span className='block clear-both font-bold uppercase leading-6'>
                            {formatDateTimePosts(post.publishedAt, 'month')}
                        </span>
                        <span className='text-3xl'>
                            {formatDateTimePosts(post.publishedAt, 'day')}
                        </span>
                        <span className='text-sm'>
                            {formatDateTimePosts(post.publishedAt, 'year')}
                        </span>
                    </div> */}

                    {/* <div className='card__date'>
    <span className=''>— {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : 'admin'}
    </span>
</div> */}

                    {/* <div className='card__date'></div> */}
                    {/* <RichText content={post.hero.richText} /> */}
                </article>
            ))
            }
        </div >
    );
};


export default PostCards;