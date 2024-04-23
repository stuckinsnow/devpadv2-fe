import Link from 'next/link';
import '../../../_css/globals.scss';
import { getPage } from '../../../_api/getPage'; // Import getPage function
import RichText from '@/app/_components/RichText';
import { formatDateTime } from '@/app/_utilities/formatDateTime';

import { Post, Media } from '../../../../pl-types';

// todo: fix type

export const dynamic = 'force-dynamic'

export default async function PostsPage({ params }: { params: { slug: string } }) {
    try {
        const data: any = await getPage("posts", params.slug);

        const newData: any = data.Posts.docs[0];

        // console.log(newData.layout[0])
        // console.log(data);


        return (
            <div>

                <li>Title: {newData.title}</li>
                <li>ID: {newData.id}</li>
                <li>Date:    {newData.slug}</li>
                <li>Slug: {formatDateTime(newData.updatedAt)}</li>
                <li>Name: {newData.populatedAuthors && newData.populatedAuthors.length > 0 ? newData.populatedAuthors[0].name : null}</li>
                <RichText content={newData.hero.richText} />
                <Link href={process.env.NEXT_PUBLIC_SERVER_URL + '/posts/'}><h3>Show all posts</h3></Link>

                {newData?.layout?.map((layout: Extract<Post['layout'][number], { blockType: 'content' | 'mediaBlock' }>, layoutIndex: number) => {
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