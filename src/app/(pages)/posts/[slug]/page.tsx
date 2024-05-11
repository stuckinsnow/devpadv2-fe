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


        return (

            <React.Fragment>
                <div className="max-w-screen-xl mx-auto">


                    <div className='m-auto max-w-screen-lg my-8 flex flex-col items-start'>

                        <div className='w-fit p-2 px-4 text-sm bg-slate-700 text-white'>
                            {rData.categories && rData.categories.length > 0 ? rData.categories.map((cat: any) => <span className='[&:not(:first-child)]:ml-4 ' key={cat.id}>{cat.title}</span>) : 'No category'}
                        </div>

                        <h1 className='text-center text-slate-800 scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl mt-2 capitalize'>{rData.title}</h1>

                        <div className='mt-4 text-slate-700'>{formatDateTime(rData.publishedAt ?? ' ')} by {rData.populatedAuthors && rData.populatedAuthors.length > 0 ? rData.populatedAuthors[0].name : 'Admin'}</div>

                    </div>

                    <RichText content={rData.hero.richText} />

                    <ContentAndMediaBlock rData={data.Posts.docs[0]} />

                </div>
                {/* <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts'}><h3>Show all posts</h3></Link>
                <div>Updated: {formatDateTime(rData.updatedAt)}</div> */}
            </React.Fragment>

        );
    } catch (error) {
        console.error(error);
    }
}