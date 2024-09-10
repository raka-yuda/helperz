import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import MDXProvider from '@/components/MDXProvider';
import { useRouter } from 'next/router';
import TableOfContents from '@/components/TableOfContents';
import { MDXRemote } from 'next-mdx-remote';


const addIdsToHeadings = (content) => {
  return content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
    const id = title.toLowerCase().replace(/[^\w]+/g, '-');
    return `${hashes} <h${hashes.length} id="${id}">${title}</h${hashes.length}>`;
  });
};

export default function CheatsheetPage({ source, frontMatter, headings }) {
  const router = useRouter();
  const title = `${frontMatter.title} | Helperz`;

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={frontMatter.description || 'Cheatsheet details'} />
      </Head>
      <div className="bg-gray-50 min-h-screen">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="flex py-8 gap-8">
            <div className="lg:w-1/4">
              <button
                onClick={handleBack}
                className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ← Back
              </button>
            </div>
            <div className="lg:w-3/4 flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900">{frontMatter.title}</h1>
              <p className="mt-2 text-sm text-gray-600">{frontMatter.date}</p>
            </div>
          </header>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="flex flex-col lg:w-1/4 lg:sticky lg:top-8 lg:self-start">
              <TableOfContents headings={headings} />
            </aside>
            <main className="lg:w-3/4">
              <article className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="prose prose-lg max-w-none px-6 py-8">
                  <MDXProvider source={source} />
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'src/data/cheatsheets.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const cheatsheets = JSON.parse(fileContent);

  const paths = cheatsheets.flatMap((typeData) =>
    typeData.cheatsheets.map((sheet) => ({
      params: {
        type: typeData.type,
        item: sheet.item,
      },
    }))
  );

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { type, item } = params;
  const filePath = path.join(process.cwd(), 'src/cheatsheets', type, `${item}.mdx`);
  const source = fs.readFileSync(filePath, 'utf-8');

  // Parse the frontmatter
  const { content, data } = matter(source);

  // Extract headings
  const headings = content.split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/[^\w]+/g, '-');
      return { level, text, id };
    });

  // Serialize the MDX content
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return { props: { source: mdxSource, frontMatter: data, headings } };
};