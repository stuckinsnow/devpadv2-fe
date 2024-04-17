// Import necessary modules
// import { gql } from '../../_graphql/gql';
import { getPosts } from '../../_api/getPosts'
import { Post } from '../../../pl-types';
import RichText from '../../_components/RichText';
import { formatDateTime } from '../_utilities/formatDateTime';

import '../../_css/globals.scss';
import Link from 'next/link';

export const dynamic = 'force-dynamic'

export default async function PostsPage() {
    const posts: Post[] = await getPosts();


    if (!posts || posts.length === 0) {
        return <div>No posts available</div>;
    }

    for (let i = 0; i < posts.length; i++) {
        console.log(posts[i].hero.media);
    }

    console.log(process.env.DB_API_KEY);


    return (

        <div>
            <h1>Post example</h1>
            <ul>
                {posts.map((post, index) => (
                    <div key={index}>
                        <li>Title: {post.title}</li>
                        <li>ID: {post.id}</li>
                        <li>Date: {formatDateTime(post.updatedAt)}</li>
                        <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/' + (post.slug ?? '')}><li>Slug: {post.slug}</li></Link>
                        <li>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>

                        <RichText content={post.hero.richText} />
                    </div>
                ))}
            </ul>
        </div>
    );
}
