export interface CommentUser {
  id: number
  login: string
  url: string
}

export interface Comment {
  id: number
  body: string
  createdAt: Date
  updatedAt: Date
  commentUrl: string
  user: CommentUser
}

export interface CommentThread {
  active: boolean
  comments: Array<Comment>
}

// ./utils/sanitizer.ts: a utility function for sanitizing the HTML output

// The dompurify library is used here to sanitize the HTML and prevent XSS attacks.

// import createDOMPurify from 'dompurify'
// import { JSDOM } from 'jsdom'

// const window = new JSDOM().window 

// export const sanitizeHtml = (unsafeContent: string): string => {
//   // @ts-ignore
//   const DOMPurify = createDOMPurify(window)
//   return DOMPurify.sanitize(unsafeContent)
// }

// https://auralinna.blog/post/2021/how-to-use-github-issues-for-blog-post-comments-with-examples-for-next-js
// COMMENTS_API_URL=https://api.github.com/repos/<account>/<repository>/issues
// COMMENTS_PUBLIC_URL=https://github.com/<account>/<repository>/issues