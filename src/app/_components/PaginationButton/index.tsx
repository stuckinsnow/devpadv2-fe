import React from 'react';
import Link from 'next/link';

const PaginationButton: React.FC<{ searchParams: string, truePosts: any, paramCat: string }> = ({ searchParams, truePosts, paramCat }) => {

    const truePage = parseInt(searchParams) || 1;
    const nextPage = truePage + 1;
    const previousPage = truePage - 1;
    const totalPages = truePosts?.Posts.totalPages;

    let previousPageButtonArrow = null;
    let firstPageButton = null;
    let previousPageButton = null;
    let nextPageButtonArrow = null;
    let nextPageButton = null;
    let lastPageButton = null;
    let dotsBefore = null;
    let dotsAfter = null;

    if (truePage > 1 && previousPage !== null) {
        previousPageButtonArrow = (
            <Link href={`/posts/?page=${truePage - 1}&category=${paramCat}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule='evenodd' d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
            </Link>
        );
    }

    if (truePage > 1 && previousPage !== null) {
        previousPageButton = <Link href={`/posts/?page=${truePage - 1}&category=${paramCat}`}>{truePage - 1}</Link>;
    }

    if (nextPage !== null && truePage < totalPages) {
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

    if (truePage > 3) {
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
            {truePage}
            {nextPageButton}
            {dotsAfter}
            {lastPageButton}
            {nextPageButtonArrow}
        </div>
    );
}

export default PaginationButton;
