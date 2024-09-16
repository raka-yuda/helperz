import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';
import { memo, useCallback, useMemo, useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';
import { IoIosArrowForward, IoIosSearch } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

const CheatsheetItem = memo(function CheatsheetItem ({ sheet, typeData }) {
  return <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0 }}
    className="duration-200"
  >
    <Link
      href={`/${typeData.type}/${sheet.item}`}
      className="flex items-center p-2 hover:bg-gray-100 rounded transition hover:text-blue-600"
    >
      <motion.div className="flex items-center w-full">
        <FaFile className="mr-2 text-gray-500" />
        <div>
          <h2 className="text-lg font-semibold">{sheet.title}</h2>
          <p className="text-sm text-gray-600">{sheet.description}</p>
        </div>
      </motion.div>
    </Link>
  </motion.li>
});

const TypeFolder = memo(function TypeFolder ({ typeData, isActive, onToggle }) {
  return (
    <div className="border rounded-lg p-4">
      <motion.button
        className="flex items-center text-xl font-semibold text-blue-600 focus:outline-none w-full gap-x-2"
        onClick={onToggle}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          initial={false}
          animate={{ rotate: isActive ? 90 : 0 }}
          transition={{ duration: 0 }}
          className="mr-2 duration-200"
        >
          <IoIosArrowForward />
        </motion.span>
        {isActive ? <FaFolderOpen size={22} /> : <FaFolder size={20} />}
        {typeData.title}
      </motion.button>
      <AnimatePresence>
        {isActive && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0 }}
            className="ml-6 space-y-2 overflow-hidden mt-2 duration-300"
          >
            {typeData.cheatsheets.map((sheet) => (
              <CheatsheetItem key={sheet.item} sheet={sheet} typeData={typeData} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
});



export default function HomePage({ cheatsheets }) {
  // const [activeTypes, setActiveTypes] = useState({});

  // const handleTypeClick = useCallback((type) => {
  //   setActiveTypes(prev => ({
  //     ...prev,
  //     [type]: !prev[type]
  //   }));
  // }, []);

  const [activeTypes, setActiveTypes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleTypeClick = useCallback((type) => {
    setActiveTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  }, []);

  const filteredCheatsheets = useMemo(() => {
    if (!searchTerm) return cheatsheets;

    return cheatsheets.map(typeData => ({
      ...typeData,
      cheatsheets: typeData.cheatsheets.filter(sheet =>
        sheet.item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(typeData => typeData.cheatsheets.length > 0);
  }, [cheatsheets, searchTerm]);



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
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cheatsheets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>
          </div>
          <p className="text-base font-normal mb-4">List of cheatsheets: </p>
          <div className="space-y-4 z-[21] mb-12">
            {(filteredCheatsheets && filteredCheatsheets.length > 0)
              ? filteredCheatsheets.map((typeData) => (
                <TypeFolder
                  key={typeData.type}
                  typeData={typeData}
                  isActive={activeTypes[typeData.type]}
                  onToggle={() => handleTypeClick(typeData.type)}
                />))
              : <div className="border rounded-lg p-4 flex justify-center items-center dark:text-white text-black">
                Empty Data
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src/data/cheatsheets.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const cheatsheets = JSON.parse(fileContent);

  return {
    props: {
      cheatsheets,
    },
  };
}