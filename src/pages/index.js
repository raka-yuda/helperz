import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';

export default function HomePage({ cheatsheets }) {
  return (
    <>
      <Head>
        <title>
          Helperz | Home
        </title>
      </Head>
      <div className="container max-w-4xl min-h-[100vh] flex flex-col mx-auto">
        <div className="flex flex-col mt-40 w-full">
          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
            <h1 className="text-4xl font-bold mb-6">Cheatsheets</h1>
          </div>
          <div className="space-y-4 z-[21]">
            {cheatsheets.map((cheat) => (
              <Link
                key={cheat.item}
                href={`/${cheat.type}/${cheat.item}`}
                className="block p-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                <h2 className="text-2xl font-semibold">{cheat.title}</h2>
                <p>{cheat.description}</p>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Read cheatsheets data from the JSON file
  const filePath = path.join(process.cwd(), 'src/data/cheatsheets.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const cheatsheets = JSON.parse(fileContent);

  return {
    props: {
      cheatsheets,
    },
  };
}