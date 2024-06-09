export const CATEGORIES = `
query categories {
  Categories {
    docs {
      id
      title
      slug
      blogCategory
      SVG {
        filename
      }
      discordChannel {
        id
        discordChannelName
        discordTagID
      }
      updatedAt
      createdAt
    }
} } `