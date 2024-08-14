import { useState } from 'react';

const CopyToClipboard = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="mb-6 inline-flex gap-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <p className="m-0 py-1">
        ✏️
      </p>
      <p className="m-0 py-1">
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </p>
    </button>
  );
};

export default CopyToClipboard;
