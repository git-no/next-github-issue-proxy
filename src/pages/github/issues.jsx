import { fetchIssues } from '@lib/api/github/fetch-issues';
import React from 'react';

// Publish Github Issues as Statuc Site Pages with raw Markdown text

const Issues = ({ posts }) => {
  return (
    <>
      <pre id="markdown" style={{ "wordWrap": "break-word", "whiteSpace": "pre-wrap" }}>{JSON.stringify(posts, null, 2)}</pre>
    </>
  )
}

export async function getStaticProps(context) {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  // const slug = context.params.slug;
  // // const mdString = await loadMDRaw(slug)
  // const mdString = await loadFile(slug)
  // console.log(`mdString: ${mdString}`);
  // // data = JSON.stringify(json)

  const posts = await fetchIssues()

  return {
    props: {
      posts
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  }
}

// export async function getStaticPaths() {
//   // const res = await fetch('https://.../posts')
//   // const posts = await res.json()

//   // const issues = await getIssues(domain);
//   // const issues = await getMarkdownPaths()

//   const issues = await fetchIssues()
//   // Get the paths we want to pre-render based on posts
//   const paths = issues?.map((issue) => ({
//     params: { slug: issue },
//   }))
//   console.log(paths);
//   // We'll pre-render only these paths at build time.
//   // { fallback: blocking } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: false }
// }

export default Issues