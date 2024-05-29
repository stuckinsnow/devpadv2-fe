export const DISCORD_THREADS = `
query {
  DiscordCommunities {
    docs {
      id
      title
      discordCommunity
      discordID
      discordCommunityJSON 
      slug
      helpful
      updatedAt
      createdAt
      introDescription
    }
  }
}
`
