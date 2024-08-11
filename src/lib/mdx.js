// lib/mdx.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export const getMdxContent = async (type, item) => {
  const cheatsheetPath = path.join(process.cwd(), 'src/cheatsheets', type, `${item}.mdx`);
  const source = fs.readFileSync(cheatsheetPath);

  const { content } = matter(source);

  const mdxSource = await serialize(content);

  return mdxSource;
};
