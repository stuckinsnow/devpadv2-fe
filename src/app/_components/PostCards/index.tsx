import React from 'react';
import Link from 'next/link';
import { PostsWithDocs, MediaExtended } from '../../../more-types';
import { Category } from '../../../pl-types';
import { formatDateTime, formatDateTimePosts } from '../../_utilities/formatDateTime';
// import RichText from '../../_components/RichText';
import CategoryIcons from '../CategoryIcons';

import './postCards.scss';
import '../../_css/globals.scss';



const PostCards: React.FC<{ posts: PostsWithDocs }> = ({ posts }) => {

    // console.log(posts[2]?.hero.richText + posts[2]?.title);

    const postsData = posts.Posts.docs;

    if (!posts) {
        return <div>No posts available</div>;
    }

    return (
        <div className='postcards rounded-lg flex flex-wrap justify-center mx-auto w-full'>

            {Array.isArray(postsData) && postsData.map((post) => (

                <article key={post.id} className={post.categories?.map((category: Category) => category.title).join(' ') + ' card w-full md:w-5/12 md:m-2 lg:w-9/12 flex flex-col lg:flex-row p-3 mt-4 rounded-md transition-all duration-75 nice-shadow box-border'}>

                    <figure className='flex flex-col '>

                        {post.hero.lowImpactMedia ? (
                            <img className='card__photo rounded-md lg:h-40 min-w-52 ' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                post.hero.lowImpactMedia as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />
                        ) : (

                            <div className='hidden lg:flex flex-col items-center justify-center w-52 md:h-40 bg-slate-900 text-white rounded-md z-10 bg-opacity-25'>

                                <span className='block clear-both font-bold uppercase leading-6'>{formatDateTimePosts(post.publishedAt, 'month')}</span>
                                <span className='text-3xl'>{formatDateTimePosts(post.publishedAt, 'day')}</span>
                                <span className='text-sm'>{formatDateTimePosts(post.publishedAt, 'year')}</span>

                            </div>)}

                    </figure>

                    <div className='lg:h-40 p-2 lg:p-0 box-border flex flex-col justify-around items-start text-left lg:ml-3 w-full h-full'>




                        <h3 className=''><Link className="text-gray-700 text-xl hover:text-amber-800 transition-all duration-75 font-bold" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}>
                            {post.title}</Link></h3>

                        <div className='card__excerpt text-gray-500 grow mb-2 lg:mb-0 mt-2'>{post.hero.excerpt}</div>

                        <div className='flex flex-row justify-between w-full text-gray-900 '><span className='card__date text-sm p-1 rounded-md bg-slate-50'>{formatDateTime(post.publishedAt)}{/* <span className='card__date--update'>Updated: {formatDateTime(post.updatedAt)}</span> */} — {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : 'admin'}</span>

                            {/* <div>

                                {Array.isArray(post.categories) && post.categories.length > 0 ? (
                                    post.categories.map((category: Category) => (

                                        <Link key={category.id} href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/?page=1&category=${category.id}`} className='card__category text-sm p-1 ml-2 rounded-md hover:text-orange-700 bg-slate-50 capitalize '>{category.title}</Link>

                                    ))
                                ) : (
                                    <span className='card__category text-sm text-slate-300 capitalize'>No Category</span>
                                )}

                            </div> */}

                            <CategoryIcons post={post} />

                        </div>
                    </div>


                    {/* <div className='card__date'></div> */}
                    {/* <RichText content={post.hero.richText} /> */}
                </article>
            ))
            }
        </div >
    );
};


export default PostCards;