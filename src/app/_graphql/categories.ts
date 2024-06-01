export const CATEGORIES = `
query categories {
  Categories {
    docs {
      id
      title
      slug
      SVG {
        filename
      }
      discordHelpTag
      discordShowcaseTag
      updatedAt
      createdAt
    }
} } `