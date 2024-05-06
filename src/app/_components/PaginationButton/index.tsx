import React from 'react';
import Link from 'next/link';
import { PostsWithDocs } from '../../../more-types';

const PaginationButton: React.FC<{ searchParams: string, posts: PostsWithDocs, paramCat: number }> = ({ searchParams, posts, paramCat }) => {

    const truePage = parseInt(searchParams) || 1;
    const nextPage = truePage + 1;

    const totalPages = Math.max(posts.Posts.totalPages, posts.Posts.page);

    const hasNextPage = posts.Posts.hasNextPage;
    const hasPrevPage = posts.Posts.hasPrevPage;

    const previousPage = truePage - 1;
    const shouldShowPrevPage = hasPrevPage || truePage > 1;
    const shouldShowNextPage = hasNextPage || truePage < totalPages;

    return (

        <div className={`wrapper ${truePage === totalPages ? 'pr-16' : ''} ${!shouldShowPrevPage ? 'pl-20' : ''}`}>


            <div className={`flex h-7 gap-4 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary bg-muted font-medium text-primary ${truePage === 1 ? 'mx-28' : 'mx-48'}`}>

                {shouldShowPrevPage && (
                    <>
                        <Link className='order-first' href={`/posts/?page=${previousPage}&category=${paramCat}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule='evenodd' d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        {truePage > 2 && <Link href={`/posts/?page=1&category=${paramCat}`}>1</Link>}
                        {truePage > 3 && <span>...</span>}
                        <Link href={`/posts/?page=${previousPage}&category=${paramCat}`}>{previousPage}</Link>
                    </>
                )}

                <span className='bg-red-200 p-2'>
                    {truePage}
                </span>


                {shouldShowNextPage && (
                    <>
                        {truePage <= totalPages - 2 && <Link href={`/posts/?page=${nextPage}&category=${paramCat}`}>{nextPage}</Link>}
                        {truePage < totalPages - 2 && <span>...</span>}
                        {truePage < totalPages && <Link href={`/posts/?page=${totalPages}&category=${paramCat}`}>{totalPages}</Link>}
                        <Link href={`/posts/?page=${nextPage}&category=${paramCat}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule='evenodd' d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default PaginationButton;