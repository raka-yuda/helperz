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
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {copied ? 'Copied!' : 'Copy to Clipboard'}
    </button>
  );
};

export default CopyToClipboard;
