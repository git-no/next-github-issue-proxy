import * as matter from 'gray-matter';

export const markdownFromString = (mdString) => {
  const mdJson = matter(mdString)
  console.log(JSON.stringify(mdJson.data));
  return mdJson
}


export const stringFromMarkdown = (mdJson) => {
  const mdString = matter.stringify(mdJson.content, mdJson.data)

  return mdString
}
