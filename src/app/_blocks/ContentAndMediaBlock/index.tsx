import React from 'react';
import RichText from '../../_components/RichText';
import { Post, Media } from '../../../pl-types';

// todo: add types
// line 24

type ContentOrMediaBlockLayout = Extract<Post['layout'][number], { blockType: 'content' | 'mediaBlock' | 'Code' }>

const ContentAndMediaBlock: React.FC<any> = (rData) => {

    return (
        <React.Fragment>
            {rData.rData.layout?.map((layout: ContentOrMediaBlockLayout, layoutIndex: number) => {
                switch (layout.blockType) {
                    case 'content':
                        return layout.columns?.map((column, columnIndex) => (
                            column.richText && (
                                <div className='ab3' key={`${layoutIndex}-${columnIndex}`}>
                                    <h3>content richText</h3>
                                    <RichText key={`${layoutIndex}-${columnIndex}`} content={column.richText} />
                                </div>
                            )
                        ));
                    case 'Code':
                        return (
                            <pre className="prose bg-slate-800 p-2 rounded-lg" key={layoutIndex}>
                                <code className='language-js text-slate-100'>
                                    {layout.code}
                                </code>
                            </pre>
                        );
                    case 'mediaBlock':
                        const layoutMedia = layout.media as Media;
                        return (
                            <div className='ab4' key={layoutIndex}>
                                <h3>content mediaBlock</h3>
                                <img className="mediablock-image" src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${layoutMedia.url}`} />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </React.Fragment >
    );
}

export default ContentAndMediaBlock;