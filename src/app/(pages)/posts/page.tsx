import { getDocs } from '../../_api/getDocs'
import '../../_css/globals.scss';
import PostBlock from '@/app/_blocks/PostBlock';

export const dynamic = 'force-dynamic'

// todo: add types

export default async function PostsPage() {

    try {

        const posts: any = await getDocs("posts");

        if (!posts || posts.length === 0) {
            return <div>No posts available</div>;
        }

        // for (let i = 0; i < posts.length; i++) {
        //     console.log(posts[i].hero);
        // }

        // console.log(process.env.DB_API_KEY);

        return (
            <div>
                <h1>Posts example</h1>

                <PostBlock posts={posts.Posts.docs} />

            </div>
        );

    } catch (error) {
        console.error(error);
    }

}