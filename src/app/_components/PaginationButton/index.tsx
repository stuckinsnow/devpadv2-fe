import React from 'react';
import Link from 'next/link';
import { Config } from '@/pl-types';



const PaginationButton: React.FC<{ searchParams: string, docData: any, paramCat: number, urlName: string }> = ({ searchParams, docData, paramCat, urlName }) => {

    const truePage = parseInt(searchParams) || 1;
    const nextPage = truePage + 1;

    const totalPages = Math.max(docData.totalPages, docData.page);

    const hasNextPage = docData.hasNextPage;
    const hasPrevPage = docData.hasPrevPage;

    const previousPage = truePage - 1;
    const shouldShowPrevPage = hasPrevPage || truePage > 1;
    const shouldShowNextPage = hasNextPage || truePage < totalPages;

    return (

        <div className={`wrapper justify-center flex align-middle ${truePage === totalPages ? 'pr-16' : ''} ${!shouldShowPrevPage ? 'pl-20' : ''} mt-0`}>


            <div className={`flex h-7 gap-4 w-fit m-auto p-4  items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary bg-muted font-medium text-primary bg-white ${truePage === 1 ? 'mx-28' : 'mx-48'}`}>

                {shouldShowPrevPage && (
                    <>
                        <Link className='order-first' href={`${urlName}/?page=${previousPage}&category=${paramCat}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule='evenodd' d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>

                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                            </svg> */}
                        </Link>
                        {truePage > 2 && <Link href={`${urlName}/?page=1&category=${paramCat}`}>1</Link>}
                        {truePage > 3 && <span>...</span>}
                        <Link href={`${urlName}/?page=${previousPage}&category=${paramCat}`}>{previousPage}</Link>
                    </>
                )}

                <span className='font-bold text-lg'>
                    {truePage}
                </span>


                {shouldShowNextPage && (
                    <>
                        {truePage <= totalPages - 2 && <Link href={`${urlName}/?page=${nextPage}&category=${paramCat}`}>{nextPage}</Link>}
                        {truePage < totalPages - 2 && <span>...</span>}
                        {truePage < totalPages && <Link href={`${urlName}/?page=${totalPages}&category=${paramCat}`}>{totalPages}</Link>}
                        <Link href={`${urlName}/?page=${nextPage}&category=${paramCat}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fillRule='evenodd' d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                            </svg>
                            {/* 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                            </svg> */}
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default PaginationButton;