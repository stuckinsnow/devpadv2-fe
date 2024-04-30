import React from 'react';

// todo: add types
// line 6

const PaginationButton: React.FC<{ posts: any, paramCat: string }> = ({ posts, paramCat }) => {

    let nValue: React.ReactNode = null;
    let pValue: React.ReactNode = null;
    const nPage: number = posts?.Posts.nextPage;
    const pPage: number = posts?.Posts.prevPage;

    console.log(posts);

    switch (true) {
        case nPage === null:
            nValue = 'no more posts available';
            break;
        case nPage !== null:
            nValue = (
                <>
                    <a href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/?page=' + posts?.Posts.nextPage + '&category=' + paramCat}>Next</a>
                </>
            );
            break;
        default:
            break;
    }

    switch (true) {
        case posts?.Posts.page > 1:
            pValue = (
                <>
                    <a href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/?page=' + (posts?.Posts.page - 1) + '&category=' + paramCat}>Previous</a>
                </>
            );
            break;
        case pPage === null && posts?.Posts.page === 1:
            pValue = 'no previous posts available';
            break;
        default:
            break;
    }

    const finalButton = <>{pValue}{nValue}</>;

    return finalButton;
}

export default PaginationButton;

