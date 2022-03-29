import * as matter from 'gray-matter';

export const markdownFromString = (mdString) => {
  // todo: was wenn empty string?
  const mattered = matter(mdString)
  // console.log(JSON.stringify(mdJson.data));
  return { data: mattered.data, content: mattered.content, raw: mattered.orig }
}


// export const stringFromMarkdown = (mdJson) => {
//   const mdString = matter.stringify(mdJson.content, mdJson.data)

//   return mdString
// }
