import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';


export default function HomePage({ cheatsheets }) {
  const [activeTypes, setActiveTypes] = useState({});

  const handleTypeClick = (type) => {
    setActiveTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };


  return (
    <>
      <Head>
        <title>
          Home | Helperz
        </title>
      </Head>
      <div className="container max-w-4xl min-h-[100vh] flex flex-col mx-auto">
        <div className="flex flex-col md:mt-32 mt-24 w-full px-4 sm:px-6 lg:px-8 md:py-12">
          <div className="
            relative flex place-items-center 
            before:absolute 
            before:h-[300px] before:lg:h-[360px]
            before:w-full sm:before:w-[480px] 
            before:-translate-x-1/2 before:rounded-full 
            before:bg-gradient-radial before:from-white 
            before:to-transparent before:blur-2xl before:content-[''] 
            after:absolute after:-z-20 
            after:h-[180px] 
            after:w-[240px] 
            after:translate-x-1/3 after:bg-gradient-conic 
            after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] 
            before:dark:bg-gradient-to-br 
            before:dark:from-transparent 
            before:dark:to-blue-700/10 
            after:dark:from-sky-900 
            after:dark:via-[#0141ff]/40 
          ">
          </div>
          <h1 className="text-4xl font-bold mb-6">🗒️ Helperz</h1>
          <p className="text-base font-normal mb-12">List of cheatsheets: </p>
          <div className="space-y-4 z-[21]">
            {cheatsheets.map((typeData) => (
              <div key={typeData.type} className="border rounded-lg p-4">
                <motion.button
                  className="flex items-center text-xl font-semibold text-blue-600 mb-2 focus:outline-none w-full gap-x-2"
                  onClick={() => handleTypeClick(typeData.type)}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    initial={false}
                    animate={{ rotate: activeTypes[typeData.type] ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="mr-2"
                  >
                    <IoIosArrowForward />
                  </motion.span>
                  {activeTypes[typeData.type] ? <FaFolderOpen /> : <FaFolder />}
                  {typeData.title}
                </motion.button>
                <AnimatePresence>
                  {activeTypes[typeData.type] && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-6 space-y-2 overflow-hidden"
                    >
                      {typeData.cheatsheets.map((sheet) => (
                        <motion.li
                          key={sheet.item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href={`/${typeData.type}/${sheet.item}`}
                            className="flex items-center p-2 hover:bg-gray-100 rounded transition hover:text-blue-600"
                          >
                            <motion.div
                              className="flex items-center w-full"
                            >
                              <FaFile className="mr-2 text-gray-500" />
                              <div>
                                <h2 className="text-lg font-semibold ">{sheet.title}</h2>
                                <p className="text-sm text-gray-600">{sheet.description}</p>
                              </div>
                            </motion.div>
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
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