import { PAGE } from '../_graphql/pages';
import { POST } from '../_graphql/posts';
import { Config } from '../../pl-types';

// todo: add types

const queryMap = {
    pages: PAGE,
    posts: POST,
};

export async function getDoc(
    collection: keyof typeof queryMap,
    slug: string)
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
                variables: slug ? { slug } : undefined,
            }),
        });

        // console.log('slug', slug);

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