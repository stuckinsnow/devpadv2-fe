import { Config, Media, Header } from './pl-types';

export interface PostsWithDocs {

    Posts: {
        docs: Config | undefined;
        totalPages: number;
        page: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    Categories: {
        docs: Config;
    };
    DiscordCommunities: {
        docs: Config;
    };
    Header: {
        docs: Header;

        columns: {
            navItems: {
                title: string;
                url: string;
                link: {
                    url: string;
                    label: string;
                };
            }[];
        }[];
    };
}

export interface MediaExtended extends Media {
    url: string;
    excerpt: string;
    focalX: number;
    focalY: number;
}