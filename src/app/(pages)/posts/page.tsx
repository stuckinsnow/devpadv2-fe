import React from 'react';
import HeroBar from '@/app/_components/HeroBar';
import { getDocs } from '../../_api/getDocs'
import PostBlock from '../../_blocks/PostBlock';
import '../../_css/globals.scss';
import SearchAndFilter from '@/app/_components/SearchAndFilter';

export const dynamic = 'force-dynamic'

// todo: add types
// line 17

export default async function PostsPage() {

    try {

        const posts: any = await getDocs("posts");

        if (!posts || posts.length === 0) {
            return <div>No posts available</div>;
        }

        return (
            <React.Fragment>
                <HeroBar />
                <SearchAndFilter />
                <div className='content'>

                    <PostBlock posts={posts.Posts.docs} />

                </div>
            </React.Fragment>
        );

    } catch (error) {
        console.error(error);
    }

}