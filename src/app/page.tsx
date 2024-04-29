import Link from 'next/link'
import { getDocs } from './_api/getDocs';
import PostCards from './_components/PostCards';
import './_css/globals.scss';
import SearchAndFilter from './_components/SearchAndFilter';
import PaginationButton from './_components/PaginationButton';



export default async function Home() {


    const bug = 'happy happy';

    try {

        const posts: any = await getDocs("posts", 1);



        if (!posts || posts.length === 0) {
            return <div>No posts available</div>;
        }

        return (
            <div>
                <h1>Blog example</h1>
                {bug}
                <p>
                    {'This is a '}
                    <Link href="/posts/page/1" target="" rel="noopener noreferrer">
                        Posts
                    </Link>
                    {' Page'}
                </p>

                <SearchAndFilter />
                <div className='content'>

                    <PostCards posts={posts.Posts.docs} />

                    <PaginationButton posts={posts} />



                </div>

            </div>
        )
    } catch (error) {
        console.error(error);
    }
}
