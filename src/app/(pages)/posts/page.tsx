import React from 'react';
import HeroBar from '../../_components/HeroBar';
import { getDocs } from '../../_api/getDocs'
import PostCards from '../../_components/PostCards';
import '../../_css/globals.scss';
import SearchAndFilter from '../../_components/SearchAndFilter';
import PaginationButton from '../../_components/PaginationButton';

export const dynamic = 'force-dynamic'


export default async function PostsPage({ searchParams }: { searchParams: { page: string, category: string } }) {

    try {

        const page = parseInt(searchParams.page) || 1;
        const categoryId = parseInt(searchParams.category) || 0;

        const posts = await getDocs("posts", page, categoryId);
        const cats = await getDocs("cats", undefined, undefined);
        const postsWithMedia = await getDocs("postswithmedia", undefined, undefined);

        // console.log(posts);
        // console.log(posts?.Posts.docs);

        // console.log('bebopp', cats.Categories.docs[0].id);

        const paramCat: number = categoryId;

        return (
            <React.Fragment>
                <HeroBar postsWithMedia={postsWithMedia} />

                <SearchAndFilter cats={cats} />
                <div className='content'>

                    <PostCards posts={posts} />

                    <PaginationButton searchParams={searchParams.page} posts={posts} paramCat={paramCat} />

                </div>
            </React.Fragment>
        );

    } catch (error) {
        console.error(error);
    }

}