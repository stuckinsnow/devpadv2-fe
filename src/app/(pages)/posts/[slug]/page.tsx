// Import necessary modules
// import { gql } from '../../_graphql/gql';
import { getPost } from '../../../_api/getPost'
import { Post } from '../../../../pl-types';
import RichText from '../../../_components/RichText';
import { formatDateTime } from '../../_utilities/formatDateTime';

import '../../../_css/globals.scss';

export const dynamic = 'force-dynamic'

export default async function PostPage({
    params
}: {
    params: { slug: string }
}) {
    const post: Post[] = await getPost(params.slug);

    // console.log(post);
    // console.log(posts[0].hero.richText);

    if (!post || post.length === 0) {
        return <div>No posts available</div>;
    }

    // for (let i = 0; i < posts.length; i++) {
    //     console.log(posts[i].hero.richText);
    // }

    return (

        <div>
            <h1>Post example</h1>
            <ul>
                {post.map((post, index) => (
                    <div key={index}>
                        <li>Title: {post.title}</li>
                        <li>ID: {post.id}</li>
                        <li>Date: {formatDateTime(post.updatedAt)}</li>
                        {/* <li>Slug: {post.slug}</li> */}
                        <li>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>

                        <RichText content={post.hero.richText} />
                    </div>
                ))}
            </ul>
        </div>
    );
}
