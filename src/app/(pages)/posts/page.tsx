// Import necessary modules
// import { gql } from '../../_graphql/gql';
import { getPosts } from '../../_api/getPosts'
import { Post } from '../../../pl-types';
import RichText from '../../_components/RichText';
import { formatDateTime } from '../_utilities/formatDateTime';

import '../../_css/globals.scss';


export default async function PostsPage() {
    const posts: Post[] = await getPosts();

    // console.log(posts);
    // console.log(posts[0].hero.richText);

    if (!posts || posts.length === 0) {
        return <div>No posts available</div>;
    }

    // for (let i = 0; i < posts.length; i++) {
    //     console.log(posts[i].hero.richText);
    // }

    return (

        <div>
            <h1>Post example</h1>
            <ul>
                {posts.map((post, index) => (
                    <div key={index}>
                        <li>Title: {post.title}</li>
                        <li>ID: {post.id}</li>
                        <li>Date: {formatDateTime(post.updatedAt)}</li>
                        <li>Slug: {post.slug}</li>
                        <li>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>

                        <RichText content={post.hero.richText} />
                    </div>
                ))}
            </ul>
        </div>
    );
}
