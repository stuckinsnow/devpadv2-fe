import { Config, Media } from './pl-types';

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

}

export interface MediaExtended extends Media {
    url: string;
    excerpt: string;
}