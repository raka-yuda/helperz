import { motion } from 'framer-motion';
import { FaFile } from 'react-icons/fa';
import Link from 'next/link';

const CheatsheetItem = ({ sheet, typeData }) => {
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
};

export default CheatsheetItem;