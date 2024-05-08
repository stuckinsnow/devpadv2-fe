import { PAGES } from '../_graphql/pages';
import { POSTS, POSTSHIGHIMPACT } from '../_graphql/posts';
import { CATEGORIES } from '../_graphql/categories';
import { Config } from '../../pl-types';

const queryMap = {
    pages: PAGES,
    posts: POSTS,
    cats: CATEGORIES,
    postswithmedia: POSTSHIGHIMPACT,
};

export async function getDocsCopy(
    collection: keyof typeof queryMap,
    page: number | undefined,
    categoryId: number | undefined,
)
    : Promise<Config | undefined> {
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
                // variables: { page, categoryId: categoryId ? [categoryId] : [] },
                variables: collection === 'postswithmedia' ? {} : { page, categoryId: categoryId ? [categoryId] : [] },
            }),
        });

        // console.log('slug', slug);

        const { data, errors } = await res.json();

        if (errors) {
            throw new Error(errors[0].message);
        }

        if (res.ok && data) {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            console.log(currentTime);
            return data;
        }

        throw new Error('Failed to fetch data');
    } catch (e) {
        throw new Error(e as string);
    }
}


