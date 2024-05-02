import React from 'react';
import HeroBar from '../../_components/HeroBar';
import { getDocs } from '../../_api/getDocs'
import PostCards from '../../_components/PostCards';
import '../../_css/globals.scss';
import SearchAndFilter from '../../_components/SearchAndFilter';
import PaginationButton from '../../_components/PaginationButton';

export const dynamic = 'force-dynamic'

// todo: add types
// line 20, 22

export default async function PostsPage({ searchParams }: { searchParams: { page: string, category: string } }) {

    try {

        const page = parseInt(searchParams.page) || 1;
        const categoryId = parseInt(searchParams.category) || 0;
        const posts: any = await getDocs("posts", page, categoryId);

        const cats: any = await getDocs("cats", undefined, undefined);
        const newCats = cats.Categories.docs;
        const paramCat: number = categoryId;

        if (!posts || posts.length === 0) {
            return <div>No posts available</div>;
        }

        return (
            <React.Fragment>
                <HeroBar />
                <SearchAndFilter newCats={newCats} />
                <div className='content'>

                    <PostCards posts={posts.Posts.docs} />

                    <PaginationButton searchParams={searchParams.page} posts={posts} paramCat={paramCat} />

                </div>
            </React.Fragment>
        );

    } catch (error) {
        console.error(error);
    }

}
