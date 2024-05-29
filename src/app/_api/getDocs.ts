import { PAGES } from '../_graphql/pages';
import { POSTS, POSTSHIGHIMPACT } from '../_graphql/posts';
import { DISCORD_THREADS } from '../_graphql/discordThreads';
import { CATEGORIES } from '../_graphql/categories';
import { PostsWithDocs } from '../../more-types';

const queryMap = {
    pages: PAGES,
    posts: POSTS,
    discordthreads: DISCORD_THREADS,
    cats: CATEGORIES,
    postshighimpact: POSTSHIGHIMPACT,
};

export async function getDocs(
    collection: keyof typeof queryMap,
    page: number | undefined,
    categoryId: number | undefined,
    type: string | undefined,
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
                variables: collection === 'postshighimpact' ? {} : { page, categoryId: categoryId ? [categoryId] : [], type },
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


