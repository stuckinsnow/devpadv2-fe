import { CONTENT, MEDIA_BLOCK } from './blocks'

export const POSTS = `
query Posts($page: Int!, $categoryId: [JSON]!) {
  Posts(page: $page, limit: 10, where: { categories: { in: $categoryId  } }) {
    totalDocs
    page
    totalPages
    hasPrevPage
    hasNextPage
    prevPage
    nextPage
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
             
              ${MEDIA_BLOCK}
            }
      }
  }
}
`

//  ${CONTENT} 

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