import React from 'react';
import RichText from '../../_components/RichText';
import { Post, Media } from '../../../pl-types';

type ContentOrMediaBlockLayout = Extract<Post['layout'][number], { blockType: 'content' | 'mediaBlock' }>

const ContentAndMediaBlock: React.FC<any> = (rData) => {

    return (

        <div>
            {rData?.layout?.map((layout: ContentOrMediaBlockLayout, layoutIndex: number) => {
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
}

export default ContentAndMediaBlock;