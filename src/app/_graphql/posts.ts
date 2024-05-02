import { CONTENT, MEDIA_BLOCK, CODE } from './blocks'

// export const POSTS = `
// query Posts($page: Int!, $categoryId: [JSON]!) {
//   Posts(page: $page, limit: 3, where: { categories: { in: $categoryId  } }) {

// export const POSTS = `
// query Posts($page: Int!, $categoryId: [JSON]!) {
//   Posts(page: $page, limit: 3, where: { 
//     categories: { in: $categoryId },
//     hero__media: { equals: null }
//   }) {
//     totalDocs
//     page
//     totalPages
//     hasPrevPage
//     hasNextPage
//     prevPage
//     nextPage
//     docs {
//       title
//       id
//       slug
//       updatedAt
//       publishedAt  
//       categories {
//         id
//         title
//       }
//       populatedAuthors {
//         id 
//         name
//       }
//       hero {
//         excerpt
//         media {
//           url
//         }
//       }  
//       layout {
//         ${MEDIA_BLOCK}
//       }
//     }
//   }
// }
// `;


export const POSTS = `
query Posts($page: Int!, $categoryId: [JSON]!) {
  Posts(page: $page, limit: 3, where: { 
    categories: { in: $categoryId },
    hero__media: { equals: null }
  }) {
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

export const POSTSWITHMEDIA = `
query {
  Posts(limit: 1, where: { hero__media: { not_equals: null } }) {
    docs {
      id
      title

      hero {
        excerpt
        media {
          url
        }
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
            ${CODE}
          }
      }
  }
} `