import React from 'react';
import HeroBar from '../../_components/HeroBar';
import { getDocs } from '../../_api/getDocs'
import PostCards from '../../_components/PostCards';
import '../../_css/globals.scss';
import SearchAndFilter from '../../_components/SearchAndFilter';
import PaginationButton from '../../_components/PaginationButton';

export const dynamic = 'force-dynamic'


export default async function PostsPage({ searchParams }: { searchParams: { page: string, category: string, type: string } }) {

    try {

        const page = parseInt(searchParams.page) || 1;
        const categoryId = parseInt(searchParams.category) || 0;

        const postsLowImpact = await getDocs("posts", page, categoryId, "lowImpact");
        const postsHighImpact = await getDocs("postshighimpact", undefined, undefined, undefined);
        const postsFeatured = await getDocs("posts", 1, categoryId, "featured");

        const cats = await getDocs("cats", undefined, undefined, undefined);

        // console.log(posts);
        // console.log(posts?.Posts.docs);

        // console.log('bebopp', cats.Categories.docs[0].id);

        console.log('bebopp', postsFeatured);

        const paramCat: number = categoryId;

        return (
            <React.Fragment>
                <HeroBar postsHighImpact={postsHighImpact} />

                <SearchAndFilter cats={cats} />
                <div className='content'>

                    <PostCards posts={postsLowImpact} />

                    <PaginationButton searchParams={searchParams.page} posts={postsLowImpact} paramCat={paramCat} />

                </div>
            </React.Fragment>
        );

    } catch (error) {
        console.error(error);
    }

}