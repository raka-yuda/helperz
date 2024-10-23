const HighlightText = ({ text, searchTerm }) => {
  if (!searchTerm || !text) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className="inline whitespace-normal">
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 text-black rounded leading-tight whitespace-pre-wrap break-words">
            {part}
          </mark>
        ) : (
          <span key={index} className="leading-tight whitespace-pre-wrap break-words">
            {part}
          </span>
        )
      )}
    </span>
  );
};

export default HighlightText;