import { PAGES } from '../_graphql/pages';
import { POSTS, POSTSWITHMEDIA } from '../_graphql/posts';
import { CATEGORIES } from '../_graphql/categories';
import { Config } from '../../pl-types';
import { PostsWithDocs } from '../../more-types';

const queryMap = {
    pages: PAGES,
    posts: POSTS,
    cats: CATEGORIES,
    postswithmedia: POSTSWITHMEDIA,
};

export async function getDocs(
    collection: keyof typeof queryMap,
    page: number | undefined,
    categoryId: number | undefined,
)
    : Promise<PostsWithDocs> {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/graphql`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `users API-Key ${process.env.DB_API_KEY}`,
            },
            body: JSON.stringify({
                query: queryMap[collection],
                variables: collection === 'postswithmedia' ? {} : { page, categoryId: categoryId ? [categoryId] : [] },
            }),
        });

        const { data, errors } = await res.json();

        if (errors) {
            throw new Error(errors[0].message);
        }

        if (res.ok && data) {
            return data;
        }

        throw new Error('Failed to fetch data');
    } catch (e) {
        throw new Error(e as string);
    }
}


