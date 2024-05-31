export const CATEGORIES = `
query categories {
  Categories {
    docs {
      id
      title
      slug
      discordHelpTag
      discordShowcaseTag
      updatedAt
      createdAt
    }
} } `