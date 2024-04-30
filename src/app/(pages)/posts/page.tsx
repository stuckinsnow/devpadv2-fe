import React from 'react';
import HeroBar from '../../_components/HeroBar';
import { getDocs } from '../../_api/getDocs'
import PostCards from '../../_components/PostCards';
import '../../_css/globals.scss';
import SearchAndFilter from '../../_components/SearchAndFilter';
import PaginationButton from '@/app/_components/PaginationButton';
import Link from 'next/link';

export const dynamic = 'force-dynamic'

// todo: add types
// line 21, 23, 39

export default async function PostsPage({ searchParams }: { searchParams: { page: string, category: string } }) {

    try {

        const page = parseInt(searchParams.page) || 1;
        const categoryId = parseInt(searchParams.category) || undefined;
        const posts: any = await getDocs("posts", page, categoryId);

        const cats: any = await getDocs("cats", undefined, undefined);
        const newCats = cats.Categories.docs;
        const paramCat: string = searchParams.category;


        if (!posts || posts.length === 0) {
            return <div>No posts available</div>;
        }

        return (
            <React.Fragment>
                <HeroBar />
                <SearchAndFilter />
                <div className='content'>

                    <div>
                        {newCats.map((cat: any) => {
                            const theLink = <Link key={cat.id} href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/' + '?page=1' + '&category=' + cat.id}><div key={cat.id}>{cat.title}</div></Link>
                            return theLink;
                        })}
                    </div>

                    <PostCards posts={posts.Posts.docs} />

                    <PaginationButton posts={posts} paramCat={paramCat} />

                </div>
            </React.Fragment>
        );

    } catch (error) {
        console.error(error);
    }

}
