/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { SerializedListItemNode, SerializedListNode } from '@lexical/list'
import type { SerializedHeadingNode, SerializedQuoteNode } from '@lexical/rich-text'
import type { LinkFields, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type { SerializedElementNode, SerializedLexicalNode, SerializedTextNode } from 'lexical'

import escapeHTML from 'escape-html'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { Label } from '../../Label'
import {
    IS_BOLD,
    IS_CODE,
    IS_ITALIC,
    IS_STRIKETHROUGH,
    IS_SUBSCRIPT,
    IS_SUPERSCRIPT,
    IS_UNDERLINE,
} from './nodeFormat'

interface Props {
    nodes: SerializedLexicalNode[]
}

function alignElementNode(node: SerializedElementNode) {
    switch (node.format) {
        case 'left':
            return 'align-lft';
        case 'right':
            return 'align-rht';
        case 'center':
            return 'align-cnt';
        case 'justify':
            return 'align-jstf';
        case 'start':
            return 'align-start';
        case 'end':
            return 'align-end';
        default:
            return '';
    }
}


export function serializeLexical({ nodes }: Props): JSX.Element {
    return (
        <Fragment>
            {nodes?.map((_node, index): JSX.Element | null => {

                if (_node.type === 'text') {
                    const node = _node as SerializedTextNode
                    let text = (
                        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} key={index} />
                    )

                    const formatComponents = [
                        { format: IS_BOLD, component: <strong /> },
                        { format: IS_ITALIC, component: <em /> },
                        { format: IS_STRIKETHROUGH, component: <span style={{ textDecoration: 'line-through' }} /> },
                        { format: IS_UNDERLINE, component: <span style={{ textDecoration: 'underline' }} /> },
                        { format: IS_CODE, component: <code /> },
                        { format: IS_SUBSCRIPT, component: <sub /> },
                        { format: IS_SUPERSCRIPT, component: <sup /> },
                    ];

                    for (const { format, component } of formatComponents) {
                        if (node.format & format) {
                            text = React.cloneElement(component, { key: index }, text);
                        }
                    }

                    return text
                }

                if (_node == null) {
                    return null
                }

                const serializedChildrenFn = (node: SerializedElementNode): JSX.Element | null => {

                    if (node.children == null) {
                        return null
                    } else {
                        if (node?.type === 'list' && (node as SerializedListNode)?.listType === 'check') {
                            for (const item of node.children) {
                                if ('checked' in item) {
                                    if (!item?.checked) {
                                        item.checked = false
                                    }
                                }
                            }
                            return serializeLexical({ nodes: node.children })
                        } else {
                            return serializeLexical({ nodes: node.children })
                        }
                    }
                }

                const serializedChildren =
                    'children' in _node ? serializedChildrenFn(_node as SerializedElementNode) : ''

                switch (_node.type) {
                    case 'linebreak': {
                        return <br key={index} />
                    }
                    case 'paragraph': {
                        return <p className={`${alignElementNode(_node as SerializedElementNode)}`} key={index}>{serializedChildren}</p>;
                    }

                    case 'heading': {
                        const node = _node as SerializedHeadingNode

                        type Heading = Extract<keyof JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
                        const Tag = node?.tag as Heading
                        return <Tag key={index}>{serializedChildren}</Tag>
                    }
                    case 'label':
                        return <Label key={index}>{serializedChildren}</Label>

                    // case 'largeBody': {
                    //     return <LargeBody key={index}>{serializedChildren}</LargeBody>
                    // }

                    case 'list': {
                        const node = _node as SerializedListNode

                        type List = Extract<keyof JSX.IntrinsicElements, 'ol' | 'ul'>
                        const Tag = node?.tag as List
                        return (
                            <Tag className={node?.listType} key={index}>
                                {serializedChildren}
                            </Tag>
                        )
                    }
                    case 'listitem': {
                        const node = _node as SerializedListItemNode

                        if (node?.checked != null) {
                            return (
                                <li
                                    aria-checked={node.checked ? 'true' : 'false'}
                                    className={`component--list-item-checkbox ${node.checked
                                        ? 'component--list-item-checkbox-checked'
                                        : 'component--list-item-checked-unchecked'
                                        }`}
                                    key={index}
                                    role="checkbox"
                                    tabIndex={-1}
                                    value={node?.value}
                                >
                                    {serializedChildren}
                                </li>
                            )
                        } else {
                            return (
                                <li key={index} value={node?.value}>
                                    {serializedChildren}
                                </li>
                            )
                        }
                    }
                    case 'quote': {
                        // const node = _node as SerializedQuoteNode

                        return <blockquote key={index}>{serializedChildren}</blockquote>
                    }
                    case 'link': {
                        const node = _node as SerializedLinkNode

                        const fields: LinkFields = node.fields

                        if (fields.linkType === 'custom') {
                            // const rel = fields.newTab ? 'noopener noreferrer' : undefined

                            return (
                                <Link
                                    href={escapeHTML(fields.url)}
                                    key={index}
                                    {...(fields?.newTab
                                        ? {
                                            rel: 'noopener noreferrer',
                                            target: '_blank',
                                        }
                                        : {})}
                                >
                                    {serializedChildren}
                                </Link>
                            )
                        } else {
                            return <span key={index}>Internal link coming soon</span>
                        }
                    }

                    default:
                        return null
                }
            })}
        </Fragment >
    )
}