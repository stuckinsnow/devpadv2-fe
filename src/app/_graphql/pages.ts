import { CONTENT, MEDIA_BLOCK, CODE } from './blocks'
import { MEDIA } from './media'

export const PAGES = `
  query Pages {
    Pages(limit: 300)  {
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
        id
        title
        hero {
          type
          richText
          media {
            url
          } 
        }
        layout {
          ${CONTENT} 
          ${MEDIA_BLOCK}
          ${CODE}
        }
      }
    }
  }
`