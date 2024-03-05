// Import necessary modules
import { gql } from '../_graphql/gql';

export async function getPosts() {
    try {
        const query = `
            query Posts {
                Posts(limit: 20) {
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

        const data = await gql(query);
        const posts = data.Posts.docs;

        return posts; // Return the posts directly, without wrapping it in a props object
    } catch (error) {
        console.error('Error fetching posts:', error);
        // If an error occurs, return an empty array as posts
        return [];
    }
}
