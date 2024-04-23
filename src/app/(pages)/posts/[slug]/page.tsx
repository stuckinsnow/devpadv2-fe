import Link from 'next/link';
import '../../../_css/globals.scss';
import { getPage } from '../../../_api/getPage'; // Import getPage function
import RichText from '@/app/_components/RichText';
import { formatDateTime } from '@/app/_utilities/formatDateTime';

import { Post, Media } from '../../../../pl-types';

// todo: add types

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: { params: { slug: string } }) {
    try {
        const data: any = await getPage("posts", params.slug);

        const rData: any = data.Posts.docs[0];

        // console.log(rData.layout[0])
        // console.log(data);

        return (
            <div>

                <li>Title: {rData.title}</li>
                <li>ID: {rData.id}</li>
                <li>Date:    {rData.slug}</li>
                <li>Slug: {formatDateTime(rData.updatedAt)}</li>
                <li>Name: {rData.populatedAuthors && rData.populatedAuthors.length > 0 ? rData.populatedAuthors[0].name : null}</li>
                <RichText content={rData.hero.richText} />
                <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/'}><h3>Show all posts</h3></Link>

                {rData?.layout?.map((layout: Extract<Post['layout'][number], { blockType: 'content' | 'mediaBlock' }>, layoutIndex: number) => {
                    if (layout.blockType === 'content') {
                        return layout.columns?.map((column, columnIndex) => (
                            column.richText && (
                                <div className='ab3' key={`${layoutIndex}-${columnIndex}`}>
                                    <h3>content richText</h3>
                                    <RichText key={`${layoutIndex}-${columnIndex}`} content={column.richText} />
                                </div>
                            )
                        ));
                    } else if (layout.blockType === 'mediaBlock') {
                        const layoutMedia = layout.media as Media;
                        return (
                            <div className='ab4' key={layoutIndex}>
                                <h3>content mediaBlock</h3>
                                <img className="mediablock-image" src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${layoutMedia.url}`} />
                            </div>
                        );

                    }
                    return null;
                })}


            </div>
        );
    } catch (error) {
        console.error(error);
    }
}