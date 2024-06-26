import { CONTENT, MEDIA_BLOCK, CODE } from './blocks'

export const POSTS = `
query Posts($page: Int!, $categoryId: [JSON]!, $type: Post_hero__type_Input!){
  Posts(page: $page, limit: 4, sort: "-publishedAt",  where: { 
    categories: { in: $categoryId },
    hero__type: { equals: $type }
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
              lowImpactMedia {
                url
              }
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

export const POSTSHIGHIMPACT = `
query Posts{
  Posts(limit: 1, sort: "publishedAt", where: { hero__type: { equals: highImpact } }) {
    docs {
      id
      title
      slug
      authors {
        id
        name
      }
      publishedAt

      hero {
        excerpt
        media {
          url
          focalX
          focalY
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
                focalX
                focalY
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