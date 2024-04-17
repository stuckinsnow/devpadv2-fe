import { gql } from '../_graphql/gql';
import { POSTS } from '../_graphql/posts'; // Import the POSTS query from the queries file

export async function getPosts() {
    try {
        const data = await gql(POSTS);
        const posts = data.Posts.docs;

        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}
