import React from 'react';
import HeroBar from '@/app/_components/HeroBar';
import { getDocs } from '../../_api/getDocs'
import PostCards from '../../_components/PostCards';
import '../../_css/globals.scss';
import SearchAndFilter from '@/app/_components/SearchAndFilter';

export const dynamic = 'force-dynamic'

// todo: add types
// line 17

export default async function PostsPage() {

    try {

        const posts: any = await getDocs("posts", 1);

        console.log(posts);

        if (!posts || posts.length === 0) {
            return <div>No posts available</div>;
        }

        return (
            <React.Fragment>
                <HeroBar />
                <SearchAndFilter />
                <div className='content'>

                    <PostCards posts={posts.Posts.docs} />

                </div>
            </React.Fragment>
        );

    } catch (error) {
        console.error(error);
    }

}