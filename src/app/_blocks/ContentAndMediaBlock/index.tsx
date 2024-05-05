import React from 'react';
import RichText from '../../_components/RichText';
import { Post, Media } from '../../../pl-types';
import { codeToHtml } from "shiki";
import './ContentAndMediaBlock.scss';

// todo: add types
// line 12

type ContentOrMediaBlockLayout = Extract<Post['layout'][number], { blockType: 'content' | 'mediaBlock' | 'Code' }>

const ContentAndMediaBlock: React.FC<any> = (rData) => {


    // const renderCode = async (code: string, lang = "javascript", theme = "github-light") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "light-plus") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "material-theme-lighter") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "min-light") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "one-light") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "rose-pine-dawn") => { // nice
    // const renderCode = async (code: string, lang = "javascript", theme = "slack-ochin") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "snazzy-light") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "solarized-light") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "vitesse-light") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "andromeeda") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "aurora-x") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "ayu-dark") => {
    // const renderCode = async (code: string, lang = "javascript", theme = "catppuccin-frappe") => {
    const renderCode = async (code: string, lang = "javascript", theme = "catppuccin-macchiato") => { // nice
        // const renderCode = async (code: string, lang = "javascript", theme = "catppuccin-mocha") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "dark-plus") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "dracula") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "dracula-soft") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "github-dark") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "github-dark-default") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "github-dark-dimmed") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "houston") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "material-theme") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "material-theme-darker") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "material-theme-ocean") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "material-theme-palenight") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "min-dark") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "monokai") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "night-owl") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "nord") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "one-dark-pro") => { // nice
        // const renderCode = async (code: string, lang = "javascript", theme = "poimandres") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "red") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "rose-pine") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "rose-pine-moon") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "slack-dark") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "solarized-dark") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "synthwave-84") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "tokyo-night") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "vesper") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "vitesse-black") => {
        // const renderCode = async (code: string, lang = "javascript", theme = "vitesse-dark") => {

        const html = await codeToHtml(code, { lang, theme });
        return <div className="rendercode" dangerouslySetInnerHTML={{ __html: html }} />;
    };

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
                        return renderCode(layout.code || '');
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

        </React.Fragment>
    );
}

export default ContentAndMediaBlock;
