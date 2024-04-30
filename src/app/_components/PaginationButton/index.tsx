import React from 'react';

// todo: add types
// line 6

const PaginationButton: React.FC<{ posts: any, paramCat: string }> = ({ posts, paramCat }) => {

    let nValue: React.ReactNode = null;
    let pValue: React.ReactNode = null;
    const nPage: number = posts?.Posts.nextPage;
    const pPage: number = posts?.Posts.prevPage;

    if (nPage === null) {
        nValue = 'no more posts available';
    }

    if (nPage !== null) {
        nValue = (
            <React.Fragment>
                <a href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/?page=' + posts?.Posts.nextPage + '&category=' + paramCat}>Next</a>
            </React.Fragment>
        );
    }

    if (pPage !== null) {
        pValue = (
            <React.Fragment>
                <a href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/?page=' + posts?.Posts.prevPage + '&category=' + paramCat}>Previous</a>
            </React.Fragment>
        );
    }

    if (pPage === null) {
        pValue = 'no previous posts available';
    }

    const finalButton = <>{pValue}{nValue}</>;

    return finalButton;
}

export default PaginationButton;

