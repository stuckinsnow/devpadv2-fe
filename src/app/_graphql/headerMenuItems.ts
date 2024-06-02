export const HEADERITEMS = `
query {
  Header {
    createdAt
    columns {
      id
      label
      navItems {
        id
        link {
          type
          newTab
          url
          label
        }
      }
    }
  }
} `