// Import necessary modules
// import { gql } from '../../_graphql/gql';
import { getPosts } from '../../_api/getPosts'
import { Post } from '../../../pl-types';
import RichText from '../../_components/RichText';
import { formatDateTime } from '../../_utilities/formatDateTime';

import '../../_css/globals.scss';
import Link from 'next/link';

export const dynamic = 'force-dynamic'

// todo: add types

export default async function PostsPage() {

    try {

        const posts: any = await getPosts("posts");

        if (!posts || posts.length === 0) {
            return <div>No posts available</div>;
        }

        // for (let i = 0; i < posts.length; i++) {
        //     console.log(posts[i].hero);
        // }

        // console.log(process.env.DB_API_KEY);

        // console.log(posts[0].hero.media);
        // <img src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL + post.hero.media.url}`} alt="Hero Image"


        console.log(posts.Posts.docs[0].title);

        return (
            <div>
                <h1>Posts example</h1>
                <ul>
                    {posts.Posts.docs.map((post: Post) => (
                        <div key={post.id}>
                            <li>{post.title}</li>
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

    } catch (error) {
        console.error(error);
    }

}