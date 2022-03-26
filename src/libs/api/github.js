import fs from 'fs';
import * as matter from 'gray-matter';
import path from 'path';

export const getContent = async (slug) => {
  try {
    const string = fs.readFileSync(path.resolve(process.cwd(), slug), 'utf8');
    // console.log(`markdownString: ${string}`);
    const json = matter(string)
    // const { data, content: json } = matter.read(path.resolve(process.cwd(), 'test.md'))
    // console.log(`json: ${JSON.stringify(json)}`);

    return Promise.resolve(json);
  } catch (error) {
    console.error(`!!!ERROR getContent: ${error.message}`);
    Promise.reject({ reason: error.message });
  }
}

// Get file / urls for all posts
export const getMarkdownPaths = async () => { return Promise.resolve(['test.md']) }

// todo datei nicht lesbar