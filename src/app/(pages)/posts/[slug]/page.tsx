import React from 'react';
import Link from 'next/link';
import '../../../_css/globals.scss';
import { getDoc } from '../../../_api/getDoc';
import RichText from '../../../_components/RichText';
import { formatDateTime } from '../../../_utilities/formatDateTime';
import { Post } from '../../../../pl-types';
import ContentAndMediaBlock from '../../../_blocks/ContentAndMediaBlock';

// todo: add types
// line 17

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: { params: { slug: string } }) {
    try {
        const data: any = await getDoc("posts", params.slug);

        const rData: Post = data?.Posts.docs[0] || null;

        // console.log('bebop', data.Posts.docs[0].layout[1]);

        // console.log(rData.layout[0]);

        return (

            <React.Fragment>
                <div className="max-w-screen-xl mx-auto">


                    <li>Title: {rData.title}</li>
                    <li>ID: {rData.id}</li>
                    <li>Slug: {rData.slug}</li>
                    <li>Update Date: {formatDateTime(rData.updatedAt)}</li>
                    <li>Publish Date: {formatDateTime(rData.publishedAt ?? ' ')}</li>
                    <li>Name: {rData.populatedAuthors && rData.populatedAuthors.length > 0 ? rData.populatedAuthors[0].name : null}</li>
                    <RichText content={rData.hero.richText} />

                    <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts'}><h3>Show all posts</h3></Link>

                    <ContentAndMediaBlock rData={data.Posts.docs[0]} />
                </div>

            </React.Fragment>

        );
    } catch (error) {
        console.error(error);
    }
}