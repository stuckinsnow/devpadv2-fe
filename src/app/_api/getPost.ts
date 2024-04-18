import { gql } from "./gql";

export const getPost = async (slug: string) => {
    try {
        const query = `
            query Posts($slug: String!) {
                Posts(where: { slug: { equals: $slug }}, limit: 1) {
                    docs {
                        title
                        id
                        slug
                        updatedAt
                        publishedAt
                        populatedAuthors {
                            id
                            name
                        }
                        hero {
                            richText
                        }
                    }
                }
            }
        `;

        const data = await gql(query, slug);
        const posts = data.Posts.docs;

        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};