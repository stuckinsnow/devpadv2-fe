export const DISCORD_THREADS = `
query DiscordThreads($page: Int!, $type: DiscordCommunity_discordCommunity_Input!) {
  DiscordCommunities(page: $page, limit: 4, sort: "-publishedAt", where: { discordCommunity: { equals: $type } }) {
    hasNextPage 
    hasPrevPage 
    limit
    nextPage
    offset
    page
    pagingCounter
    prevPage
    totalDocs
    totalPages
    docs {
      id
      title
      discordCommunity
      discordID
      excerpt
      discordFirstMessageLink
      discordMessageCount
      discordArray {
        id 
        discordInfo
        discordIntro 
        discordMessages
      }  
      slug
      published
      updatedAt
      createdAt 
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
      excerpt
      discordArray {
        id
        discordContent
        discordInfo
        discordIntro 
        discordMessages

      }  
      slug
      published
      updatedAt
      createdAt 
    } 
  }
}
`