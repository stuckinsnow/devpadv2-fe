import React from 'react';
import Link from 'next/link';
import '../../../_css/globals.scss';
import { getDoc } from '../../../_api/getDoc';
import RichText from '@/app/_components/RichText';
import { formatDateTime } from '@/app/_utilities/formatDateTime';
import { Config, Post } from '../../../../pl-types';

import ContentAndMediaBlock from '../../../_blocks/ContentAndMediaBlock';

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: { params: { slug: string } }) {
    try {
        const data: any = await getDoc("posts", params.slug);

        const rData: Post = data?.Posts.docs[0] || null;


        const dataType = data as any;
        const post = dataType?.Posts?.docs[0] || null;

        // console.log('bebop', data.Posts.docs[0].layout);

        // console.log(data.Posts.docs[0].layout[0]);

        return (

            <React.Fragment>

                <li>Title: {rData.title}</li>
                <li>ID: {rData.id}</li>
                <li>Date: {rData.slug}</li>
                <li>Slug: {formatDateTime(rData.updatedAt)}</li>
                <li>Name: {rData.populatedAuthors && rData.populatedAuthors.length > 0 ? rData.populatedAuthors[0].name : null}</li>
                <RichText content={rData.hero.richText} />

                <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/'}><h3>Show all posts</h3></Link>

                <ContentAndMediaBlock rData={... rData} />

            </React.Fragment>

        );
    } catch (error) {
        console.error(error);
    }
}