import { markdownFromString, stringFromMarkdown } from '@lib/markdown';
import fs from 'fs';
import path from 'path';


export const loadFile = async (slug) => {
  const string = fs.readFileSync(path.resolve(process.cwd(), `${slug}`), 'utf8');
  return string
}

export const loadMD = async (slug) => {
  try {
    const mdString = readFile(slug)
    // console.log(`markdownString: ${string}`);
    const mdJson = markdownFromString(mdString);
    // const { data, content: json } = matter.read(path.resolve(process.cwd(), 'test.md'))
    // console.log(`json: ${JSON.stringify(json)}`);

    return Promise.resolve(mdJson);
  } catch (error) {
    console.error(`!!!ERROR getContent: ${error.message}`);
    Promise.reject({ reason: error.message });
  }
}

export const loadMDRaw = async (slug) => {
  try {
    const mdJson = await loadMD(slug);
    const mdString = stringFromMarkdown(mdJson)

    return Promise.resolve(mdString);
  } catch (error) {
    console.error(`!!!ERROR getContent: ${error.message}`);
    Promise.reject({ reason: error.message });
  }
}

// Get file / urls for all posts
export const getMarkdownPaths = async () => { return Promise.resolve(['test.md']) }

// todo datei nicht lesbar