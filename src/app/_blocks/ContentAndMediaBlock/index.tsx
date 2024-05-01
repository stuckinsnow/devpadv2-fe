import React from 'react';
import RichText from '../../_components/RichText';
import { Post, Media } from '../../../pl-types';
import { codeToHtml } from "shiki";

interface CodeHappyProps {
    code: any;
}

async function CodeHappy({ code }: CodeHappyProps): Promise<JSX.Element> {
    const html = await codeToHtml(code, {
        lang: "javascript",
        theme: "github-dark",
    });

    return <div className="" dangerouslySetInnerHTML={{ __html: html }}></div>;
}
// todo: add types
// line 10

type ContentOrMediaBlockLayout = Extract<Post['layout'][number], { blockType: 'content' | 'mediaBlock' | 'Code' }>

const ContentAndMediaBlock: React.FC<any> = (rData) => {

    return (

        <div>


            {rData.rData.layout?.map((layout: ContentOrMediaBlockLayout, layoutIndex: number) => {

                // console.log(layout);

                < RichText content={rData.layout?.columns[0].richText} />

                if (layout.blockType === 'content') {
                    return layout.columns?.map((column, columnIndex) => (
                        column.richText && (
                            <div className='ab3' key={`${layoutIndex}-${columnIndex}`}>
                                <h3>content richText</h3>
                                <RichText key={`${layoutIndex}-${columnIndex}`} content={column.richText} />
                            </div>
                        )
                    ));
                }

                if (layout.blockType === 'Code') {
                    // console.log('bebop', layout.code);
                    return (
                        <div className='ab2' key={layoutIndex}>
                            <h3>content code</h3>
                            <pre>
                                <CodeHappy code={layout.code} />
                                {/* <code className='text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6'>
                                    {layout.code}
                                </code> */}
                            </pre>
                        </div>
                    );
                }

                else if (layout.blockType === 'mediaBlock') {
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