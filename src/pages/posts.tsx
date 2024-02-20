import { gql } from '../_graphql/gql';
import { Config } from '../pl-types';

export default function Posts({ posts }: { posts: Config['collections']['posts'][] }) {

    if (!posts || posts.length === 0) {
        return <div>No posts available</div>;
    }


    // Log authors
    posts.map((post) => {
        if (post.populatedAuthors && post.populatedAuthors.length > 0) {
            console.log(post.populatedAuthors[0].name);
        }

        console.log(post.hero.richText);
    });

    return (
        <div>
            <h1>Post example</h1>
            <ul>
                {posts.map((post, index) => (
                    <div key={index}>
                        <li>
                            Title: {post.title}
                        </li>
                        <li>
                            ID: {post.id}
                        </li>
                        <li>
                            Date: {post.updatedAt}
                        </li>
                        <li>
                            Slug: {post.slug}
                        </li>

                        <li>
                            Name: {post.populatedAuthors && post.populatedAuthors.length > 0 ? post.populatedAuthors[0].name : null}
                        </li>

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
        return {
            props: {
                posts: [],
            },
        };
    }
}
