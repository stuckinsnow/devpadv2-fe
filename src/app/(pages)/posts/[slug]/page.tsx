import React from 'react';
import { getDoc } from '../../../_api/getDoc';
import RichText from '../../../_components/RichText';
import { Category } from '../../../../pl-types';
import { formatDateTime } from '../../../_utilities/formatDateTime';
import ContentAndMediaBlock from '../../../_blocks/ContentAndMediaBlock';

import '../../../_css/globals.scss';

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: { params: { slug: string } }) {
    try {
        const data = await getDoc("posts", params.slug);

        const rData = Array.isArray(data?.Posts.docs) ? data.Posts.docs[0] : undefined;

        return (


            <div className="max-w-screen-xl mx-auto">

                <div className='m-auto max-w-screen-lg my-8 flex flex-col items-start'>

                    <div className='w-fit text-sm'>
                        {rData.categories && rData.categories.length > 0 ? rData.categories.map((cat: Category) => <span className=' [&:not(:first-child)]:ml-2 text-slate-700 capitalize' key={cat.id}>#{cat.title}</span>) : 'No category'}
                    </div>

                    <h1 className='text-slate-800 scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl mt-2 capitalize'>{rData.title}</h1>

                    <div className='mt-4 text-slate-700'>{formatDateTime(rData.publishedAt ?? ' ')} - {rData.populatedAuthors && rData.populatedAuthors.length > 0 ? rData.populatedAuthors[0].name : 'Admin'}</div>
                    <div className='text-slate-700'>Updated: {formatDateTime(rData.updatedAt)}</div>

                </div>

                <RichText content={rData.hero.richText} />
                <ContentAndMediaBlock rData={rData} />

            </div>



        );
    } catch (error) {
        console.error(error);
    }
}