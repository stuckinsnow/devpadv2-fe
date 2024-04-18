export const PAGES = `
query Pages {
    Pages(limit: 20) {
      docs {
        title
        id
        slug
        updatedAt
        publishedAt   
              hero {
                richText
                media {
                  url
                }
              } 
      }
    }
} 
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        title
        id
        slug
        updatedAt
        publishedAt   
              hero {
                richText
                media {
                  url
                }
              } 
      }
    }
    }
  }
`