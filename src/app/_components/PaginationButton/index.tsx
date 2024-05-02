import React from 'react';
import Link from 'next/link';

const PaginationButton: React.FC<{ searchParams: string, posts: any, paramCat: string }> = ({ searchParams, posts, paramCat }) => {

    const truePage = parseInt(searchParams) || 1;
    const nextPage = truePage + 1;

    const totalPages = posts.Posts.totalPages <= posts.Posts.page ? posts.Posts.page : posts.Posts.totalPages;


    let previousPageButtonArrow = null;
    let firstPageButton = null;
    let previousPageButton = null;
    let nextPageButtonArrow = null;
    let nextPageButton = null;
    let lastPageButton = null;
    let dotsBefore = null;
    let dotsAfter = null;

    const hasNextPage = posts.Posts.hasNextPage;
    const hasPrevPage = posts.Posts.hasPrevPage;

    // console.log(posts);
    // console.log(posts.Posts.hasPrevPage);

    if (posts.Posts.hasPrevPage || truePage > 1) {
        previousPageButtonArrow = (
            <Link href={`/posts/?page=${truePage - 1}&category=${paramCat}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule='evenodd' d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </Link>
        );
    }

    if (hasPrevPage === true && truePage > 1 || hasPrevPage === false && truePage > 1) {
        previousPageButton = <Link href={`/posts/?page=${truePage - 1}&category=${paramCat}`}>{truePage - 1}</Link>;
    }

    if (hasNextPage === true) {
        nextPageButtonArrow = (
            <Link href={`/posts/?page=${nextPage}&category=${paramCat}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule='evenodd' d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                </svg>
            </Link>
        );
    }

    if (truePage > 2) {
        firstPageButton = <Link href={`/posts/?page=1&category=${paramCat}`}>1</Link>;
    }

    if (nextPage !== null && truePage <= totalPages - 2) {
        nextPageButton = <Link href={`/posts/?page=${nextPage}&category=${paramCat}`}>{nextPage}</Link>;
    }

    if (truePage < totalPages) {
        lastPageButton = <Link href={`/posts/?page=${totalPages}&category=${paramCat}`}>{totalPages}</Link>;
    }

    if (truePage > 3 && hasPrevPage === true) {
        dotsBefore = <span>...</span>;
    }

    if (truePage < totalPages - 2 && truePage !== totalPages) {
        dotsAfter = <span>...</span>;
    }

    return (
        <div className='flex h-7 gap-4 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary bg-muted font-medium text-primary'>
            {previousPageButtonArrow}
            {firstPageButton}
            {dotsBefore}
            {previousPageButton}
            <span className='bg-red-200 p-2'>
                {truePage}
            </span>
            {nextPageButton}
            {dotsAfter}
            {lastPageButton}
            {nextPageButtonArrow}
        </div>
    );
}

export default PaginationButton;
