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
      helpful
      updatedAt
      createdAt
      introDescription
    } 
  }
}
`