export const POSTS = `
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
`

export const POST = `
  query Posts {
    Posts(where: { slug: { equals: $slug }}, limit: 1) {
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
`