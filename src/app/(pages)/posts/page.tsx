import { getDocs } from '../../_api/getDocs'
import PostBlock from '../../_blocks/PostBlock';
import '../../_css/globals.scss';

export const dynamic = 'force-dynamic'

// todo: add types
// line 14

export default async function PostsPage() {

    try {

        const posts: any = await getDocs("posts");

        if (!posts || posts.length === 0) {
            return <div>No posts available</div>;
        }

        return (
            <div className='content'>
                <h1>Posts example</h1>

                <PostBlock posts={posts.Posts.docs} />

            </div>
        );

    } catch (error) {
        console.error(error);
    }

}