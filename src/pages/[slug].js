import { getContent, getMarkdownPaths } from '@/libs/api/github';
import * as matter from 'gray-matter';

// Publish Github Issues as Statuc Site Pages with raw Markdown text

const Issues = ({ data }) => {
  // const string = JSON.stringify(data)
  // console.log(string)
  return (
    <>
      {matter.stringify(data.content, data.data)}
    </>
  )
}

export async function getStaticProps(context) {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  let data
  try {
    const slug = context.params.slug;
    console.log(`slug: ${slug}`);
    data = await getContent(slug);
    // data = JSON.parse(string)
    console.log(`data getStaticProps: ${JSON.stringify(json)}`);

  } catch (error) {
    console.error(`!!!ERROR getStaticProps: ${error.message}`);
  }

  return {
    props: {
      data: JSON.stringify(data)
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    // revalidate: 10, // In seconds
  }
}

export async function getStaticPaths() {
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  const issues = await getMarkdownPaths()


  // Get the paths we want to pre-render based on posts
  const paths = issues.map((issue) => ({
    params: { slug: issue },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false }
}

export default Issues