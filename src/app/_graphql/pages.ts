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