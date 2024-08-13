// pages/[type]/[item].js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import MDXProvider from '@/components/MDXProvider';
import { useRouter } from 'next/router';

export default function CheatsheetPage({ source, frontMatter }) {
	const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{frontMatter.title} | Helperz</title>
        <meta name="description" content={frontMatter.description || 'Cheatsheet details'} />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="bg-gray-50 min-h-screen">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<button
						onClick={handleBack}
						className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						← Back
					</button>
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <header className="px-6 py-8 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900">{frontMatter.title}</h1>
              <p className="mt-2 text-sm text-gray-600">{frontMatter.date}</p>
            </header>
            <div className="prose prose-lg max-w-none px-6 py-8">
            	<MDXProvider source={source} />
            </div>
          </article>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  // Define paths for static generation
  const paths = [
    { params: { type: 'react-hooks', item: 'useDebounce' } },
  ];

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { type, item } = params;
  const filePath = path.join(process.cwd(), 'src/cheatsheets', type, `${item}.mdx`);
  const source = fs.readFileSync(filePath, 'utf-8');

  // Parse the frontmatter
  const { content, data } = matter(source);

  // Serialize the MDX content
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });


  return { props: { source: mdxSource, frontMatter: data } };
};
