import { motion } from 'framer-motion';
import { FaFile } from 'react-icons/fa';
import Link from 'next/link';
import HighlightText from '@/components/HighlightText';

const CheatsheetItem = ({ sheet, typeData, searchTerm }) => {
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
      <motion.div className="flex flex-row justify-start items-center w-full">
        <div className='shrink-0 flex justify-center items-start p-2 mr-2'>
          <FaFile size={18} className="text-gray-500" />
        </div>
        <div className='flex flex-grow flex-col'>
          <h2 className="text-lg font-semibold">
            <HighlightText text={sheet.title} searchTerm={searchTerm} />
          </h2>
          <p className="text-sm text-gray-600">
            <HighlightText text={sheet.description} searchTerm={searchTerm} />
          </p>
        </div>
      </motion.div>
    </Link>
  </motion.li>
};

export default CheatsheetItem;