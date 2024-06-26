/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    posts: Post;
    pages: Page;
    users: User;
    categories: Category;
    media: Media;
    graphics: Graphic;
    'discord-community': DiscordCommunity;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    header: Header;
    footer: Footer;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: number;
  title: string;
  categories?: (number | Category)[] | null;
  publishedAt?: string | null;
  authors?: (number | User)[] | null;
  populatedAuthors?:
  | {
    id?: string | null;
    name?: string | null;
  }[]
  | null;
  hero: {
    type: 'featured' | 'highImpact' | 'lowImpact';
    richText: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    excerpt?: string | null;
    ManualExcerpt?: boolean | null;
    media?: number | Media | null;
    lowImpactMedia?: number | Media | null;
  };
  layout: (
    | {
      columns?:
      | {
        size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
        richText: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        };
        enableLink?: boolean | null;
        id?: string | null;
      }[]
      | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'content';
    }
    | {
      invertBackground?: boolean | null;
      position?: ('default' | 'fullscreen') | null;
      media: number | Media;
      id?: string | null;
      blockName?: string | null;
      blockType: 'mediaBlock';
    }
    | {
      code?: string | null;
      position?: ('default' | 'fullscreen') | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'Code';
    }
  )[];
  relatedPosts?: (number | Post)[] | null;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: number;
  title?: string | null;
  slug?: string | null;
  SVG?: number | Graphic | null;
  blogCategory?: boolean | null;
  discordChannel?:
  | {
    discordChannelName?: string | null;
    discordTagID?: string | null;
    id?: string | null;
  }[]
  | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "graphics".
 */
export interface Graphic {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  roles?: ('admin' | 'user')[] | null;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  title: string;
  categories?: (number | Category)[] | null;
  publishedAt?: string | null;
  DiscordThreadID?: string | null;
  hero: {
    type: 'featured' | 'highImpact' | 'lowImpact';
    richText: {
      root: {
        type: string;
        children: {
          type: string;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ('ltr' | 'rtl') | null;
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    };
    excerpt?: string | null;
    ManualExcerpt?: boolean | null;
    media?: number | Media | null;
    lowImpactMedia?: number | Media | null;
  };
  layout: (
    | {
      columns?:
      | {
        size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
        richText: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        };
        enableLink?: boolean | null;
        id?: string | null;
      }[]
      | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'content';
    }
    | {
      invertBackground?: boolean | null;
      position?: ('default' | 'fullscreen') | null;
      media: number | Media;
      id?: string | null;
      blockName?: string | null;
      blockType: 'mediaBlock';
    }
    | {
      code?: string | null;
      position?: ('default' | 'fullscreen') | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'Code';
    }
  )[];
  discordComment?:
  | {
    publishedAt?: string | null;
    discordUsername?: string | null;
    discordUserID?: string | null;
    discordContent?: string | null;
    id?: string | null;
  }[]
  | null;
  slug?: string | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "discord-community".
 */
export interface DiscordCommunity {
  id: number;
  title?: string | null;
  discordCommunity?: ('discordHelp' | 'discordShowcase') | null;
  discordID?: string | null;
  excerpt?: string | null;
  discordFirstMessageLink?: string | null;
  discordMessageCount?: number | null;
  discordArray?:
  | {
    discordContent?: string | null;
    discordMessages?:
    | {
      [k: string]: unknown;
    }
    | unknown[]
    | string
    | number
    | boolean
    | null;
    discordInfo?:
    | {
      [k: string]: unknown;
    }
    | unknown[]
    | string
    | number
    | boolean
    | null;
    discordIntro?:
    | {
      [k: string]: unknown;
    }
    | unknown[]
    | string
    | number
    | boolean
    | null;
    id?: string | null;
  }[]
  | null;
  slug?: string | null;
  published?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
  | {
    [k: string]: unknown;
  }
  | unknown[]
  | string
  | number
  | boolean
  | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: number;
  columns?:
  | {
    label: string;
    navItems?:
    | {
      link: {
        type?: ('reference' | 'custom') | null;
        newTab?: boolean | null;
        reference?: {
          relationTo: 'pages';
          value: number | Page;
        } | null;
        url?: string | null;
        label: string;
      };
      id?: string | null;
    }[]
    | null;
    id?: string | null;
  }[]
  | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: number;
  columns?:
  | {
    label: string;
    navItems?:
    | {
      link: {
        type?: ('reference' | 'custom') | null;
        newTab?: boolean | null;
        reference?: {
          relationTo: 'pages';
          value: number | Page;
        } | null;
        url?: string | null;
        label: string;
      };
      id?: string | null;
    }[]
    | null;
    id?: string | null;
  }[]
  | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config { }
}