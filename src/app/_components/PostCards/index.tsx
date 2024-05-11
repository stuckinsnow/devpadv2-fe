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
        <div className='postcards rounded-lg flex flex-wrap  mx-auto'>

            {Array.isArray(postsData) && postsData.map((post) => (

                <article key={post.id} className={post.categories?.map((category: Category) => category.title).join(' ') + ' card flex flex-row w-full p-2 mt-4 box-content rounded-md transition-all duration-75 nice-shadow'}>

                    <figure className='flex flex-col '>

                        {post.hero.lowImpactMedia && (
                            <img className='card__photo rounded-md max-h-44 ' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                post.hero.lowImpactMedia as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />
                        )}

                    </figure>

                    <div className='w-full h-36 box-border flex flex-col justify-around items-start text-left ml-4'>

                        <h3 className=''><Link className="text-gray-900 text-xl hover:text-amber-800 transition-all duration-75 font-bold" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}>
                            {post.title}</Link></h3>

                        <div className='card__excerpt mt-4 text-gray-500 grow'>{post.hero.excerpt}</div>

                        <div className='flex flex-row justify-between w-full text-gray-900 '>
                            <span className='card__date'>{formatDateTime(post.publishedAt)}
                                {/* <span className='card__date--update'>Updated: {formatDateTime(post.updatedAt)}</span> */} — {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : 'admin'}
                            </span>

                            <div>

                                {Array.isArray(post.categories) && post.categories.length > 0 ? (
                                    post.categories.map((category: Category) => (
                                        <span key={category.id} className='card__category text-slate-300'>
                                            <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/?page=1&category=${category.id}`} className='ml-4'>
                                                {category.title}
                                            </Link>
                                        </span>
                                    ))
                                ) : (
                                    <span className='card__category text-slate-300'>No Category</span>
                                )}

                            </div>

                        </div>
                    </div>

                    {/* <div className='flex flex-col w-36 min-h-24 bg-slate-900 text-white z-10'>

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



                    {/* <div className='card__date'></div> */}
                    {/* <RichText content={post.hero.richText} /> */}
                </article>
            ))
            }
        </div >
    );
};


export default PostCards;