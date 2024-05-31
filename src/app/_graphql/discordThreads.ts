export const DISCORD_THREADS = `
query DiscordThreads($type: DiscordCommunity_discordCommunity_Input!) {
  DiscordCommunities(where: { discordCommunity: { equals: $type } }) {
    docs {
      id
      title
      discordCommunity
      discordID
      discordCommunityJSON 
      slug
      published
      updatedAt
      createdAt
      introDescription
    }
  }
}
`

export const DISCORD_THREAD = `
query DiscordThread($slug: String!){
  DiscordCommunities(where: { slug: { equals: $slug } }) {
    docs {
      id
      title
      discordCommunity
      discordID
      discordCommunityJSON 
      slug
      published
      updatedAt
      createdAt
      introDescription
    } 
  }
}
`