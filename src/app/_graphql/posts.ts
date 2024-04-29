import { CONTENT, MEDIA_BLOCK } from './blocks'

export const POSTS = `
query Posts {
  Posts(limit: 20) {
      docs {
          title
          id
          slug
          updatedAt
          publishedAt  
          categories {
            id
            title
          }
          populatedAuthors {
              id 
              name
            }

            hero {
              excerpt
              media {
                url
              }
            }  

            layout {
              ${CONTENT} 
              ${MEDIA_BLOCK}
            }

      }
  }
}
`


export const POST = `
query Posts($slug: String!) {
  Posts(where: { slug: { equals: $slug }}, limit: 1) {
      docs {
          title
          id
          slug
          updatedAt
          publishedAt
          categories {
            id
            title
          }
          populatedAuthors {
              id
              name
          }
          hero {
              richText
              media {
                url
              }
          }

          layout {
            ${CONTENT} 
            ${MEDIA_BLOCK}
          }
      }
  }
} `