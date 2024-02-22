// Import necessary modules
import { gql } from '../_graphql/gql';
import { Config } from '../pl-types';
import RichText from '@/_components/RichText';

// Define the functional component
export default function Posts({ posts }: { posts: Config['collections']['posts'][] }) {

    // console.log(posts[0].hero.richText);
    // If there are no posts, render a message
    if (!posts || posts.length === 0) {
        return <div>No posts available</div>;
    }

    console.log(posts[3].hero.richText)

    return (
        <div>
            <h1>Post example</h1>
            <ul>
                {posts.map((post, index) => (
                    <div key={index}>
                        <li>Title: {post.title}</li>
                        <li>ID: {post.id}</li>
                        <li>Date: {post.updatedAt}</li>
                        <li>Slug: {post.slug}</li>
                        <li>Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}</li>

                        <RichText content={post.hero.richText} />
                    </div>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps() {
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

        return {
            props: {
                posts,
            },
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        // If an error occurs, return an empty array as posts
        return {
            props: {
                posts: [],
            },
        };
    }
}
