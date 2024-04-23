import Link from 'next/link';
import '../../../_css/globals.scss';
import { getPage } from '../../../_api/getPage'; // Import getPage function
import RichText from '@/app/_components/RichText';
import { formatDateTime } from '@/app/_utilities/formatDateTime';

import { Post } from '../../../../pl-types';

// todo: fix type

export const dynamic = 'force-dynamic'

export default async function PostsPage({ params }: { params: { slug: string } }) {
    try {
        const data: any = await getPage("posts", params.slug);


        return (
            <div>

                {data?.Posts.docs.map((doc: Post, index: number) => (

                    <div key={index}>
                        <li>Title: {doc.title}</li>
                        <li>ID: {doc.id}</li>
                        <li>Date: {formatDateTime(doc.updatedAt)}</li>
                        <li>Slug: {doc.slug}</li>
                        <li>Name: {doc.populatedAuthors && doc.populatedAuthors.length > 0 ? doc.populatedAuthors[0].name : null}</li>
                        <RichText content={doc.hero.richText} />
                        <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/'}><h3>Show all posts</h3></Link>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error(error);
    }
}