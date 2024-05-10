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
        <div className='postcards rounded-lg flex flex-wrap mx-auto'>

            {Array.isArray(postsData) && postsData.map((post) => (



                <article key={post.id} className={post.categories?.map((category: Category) => category.title).join(' ') + ' card flex flex-col p-4 text-left box-content w-3/12 border-cyan-700 border-solid border m-4 hover:shadow-xl transition-all duration-200 hover:scale-105'}>



                    <figure className='flex flex-col  py-2 w-full mx-4'>
                        {post.hero.lowImpactMedia && (
                            <img className='card__photo rounded-t-md' src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + (
                                post.hero.lowImpactMedia as MediaExtended)?.url.replace(/\.jpg/g, '-400x300.jpg')}`} alt={post.title + 'card__hero-photo'} />
                        )}
                    </figure>

                    <div className='flex -mt-24 -mb-4 flex-col bg-white text-slate-800 bg-opacity-60 py-2 w-32 mx-4 z-100 rounded-t-md'>


                        <span className='block clear-both font-bold uppercase leading-6'>
                            {formatDateTimePosts(post.publishedAt, 'month')}
                        </span>
                        <span className='text-3xl'>
                            {formatDateTimePosts(post.publishedAt, 'day')}
                        </span>
                        <span className='text-sm'>
                            {formatDateTimePosts(post.publishedAt, 'year')}
                        </span>


                    </div>



                    <div className='p-4 w-full mt-2'>

                        <div className='card__category mt-2 text-gray-500 text-sm'>{post?.categories?.map((category: Category) => category.title).join(', ') || ' No Category'}</div>
                        <div className='card__title mt-2 font-bold text-gray-600 text-xl hover:text-amber-800 transition-all duration-200'>
                            <Link className="" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}><h3 className=''>{post.title}</h3></Link>
                        </div>
                        <div className='card__excerpt mt-4 text-gray-500  '>{post.hero.excerpt}</div>

                        <div className='card__date--update mt-4 text-gray-400'>Updated: {formatDateTime(post.updatedAt)}</div>

                        <div className='text-gray-500 mt-4 text-sm uppercase hover:text-amber-800 transition-all duration-200'><Link className="" href={`${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${post.slug}`}>Read More</Link></div>




                    </div>

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