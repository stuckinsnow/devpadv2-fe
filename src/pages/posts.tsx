import { gql } from '../_graphql/gql';
import { Config } from '../pl-types';

export default function Posts({ posts }: { posts: Config['collections']['posts'][] }) {

    console.log(posts);
    console.log(posts[0].hero.richText);

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
                            {/* {post.hero.richText.map((richText: any, index) => (
                                <div key={index}>
                                    {richText}
                                </div>
                            ))} */}
                        </li>
                        <li>
                            {/* Authors: {post.authors.map(author => author.name).join(', ')} */}
                        </li>
                        <li>
                            {/* Hero Content: {post.hero.richText} */}
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
        Posts(limit: 1) {
          docs {
            id
            slug
            updatedAt
            authors {
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
