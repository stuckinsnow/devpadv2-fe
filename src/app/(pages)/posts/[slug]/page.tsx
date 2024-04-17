import { getPost } from '../../../_api/getPost'
import { Post } from '../../../../pl-types';
import RichText from '../../../_components/RichText';
import { formatDateTime } from '../../_utilities/formatDateTime';
import Link from 'next/link';

import '../../../_css/globals.scss';

export const dynamic = 'force-dynamic'

export default async function PostPage({
    params
}: {
    params: { slug: string }
}) {
    const post: Post[] = await getPost(params.slug);

    if (!post || post.length === 0) {
        return <div>No posts available</div>;
    }


    console.log(post[0]?.hero.media)



    console.log(process.env.DB_API_KEY);

    return (

        <div>
            <h1>Post example</h1>
            <ul>
                {post.map((post, index) => (



                    <div key={index}>
                        {/* <li>Img: {post.media}</li> */}
                        <li>Title: {post.title}</li>
                        <li>ID: {post.id}</li>
                        <li>Date: {formatDateTime(post.updatedAt)}</li>
                        {/* <li>Slug: {post.slug}</li> */}
                        <li>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>

                        <RichText content={post.hero.richText} />

                    </div>
                ))}
                <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/'}><h3>Show all posts</h3></Link>
            </ul>
        </div>
    );
}
