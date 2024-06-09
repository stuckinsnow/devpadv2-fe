import React from 'react';
import { getDocs } from '../../_api/getDocs'
import About from '../../_components/About';
import HeroBar from '../../_components/HeroBar';
import PaginationButton from '../../_components/PaginationButton';
import PostCards from '../../_components/PostCards';
import SearchAndFilter from '../../_components/SearchAndFilter';

import '../../_css/globals.scss';

export const dynamic = 'force-dynamic'

export default async function PostsPage({ searchParams }: { searchParams: { page: string, category: string, type: string } }) {

    try {

        const page = parseInt(searchParams.page) || 1;
        const categoryId = parseInt(searchParams.category) || 0;

        const postsLowImpact = await getDocs("posts", page, categoryId, "lowImpact");
        const postsHighImpact = await getDocs("postshighimpact", undefined, undefined, undefined);
        // const postsFeatured = await getDocs("posts", 1, categoryId, "featured");

        const cats = await getDocs("cats", undefined, undefined, undefined);

        const paramCat: number = categoryId;

        const urlName: string = 'posts';

        return (
            <React.Fragment>
                <About />

                <HeroBar postsHighImpact={postsHighImpact} />

                <div className='content'>
                    <SearchAndFilter cats={cats} />

                    <PostCards posts={postsLowImpact} />

                    <PaginationButton searchParams={searchParams.page} docData={postsLowImpact.Posts} paramCat={paramCat} urlName={urlName} />

                </div>
            </React.Fragment>
        );

    } catch (error) {
        console.error(error);
    }

}