import React from 'react';
import { useEffect, useState } from 'react';

const TableOfContents = ({ headings }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="toc">
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`toc-item`}>
            <a
              href={`#${heading.id}`}
              className={`block py-1 px-2 text-sm hover:bg-gray-100 rounded
                ${activeId === heading.id ? 'font-bold text-blue-600' : 'text-gray-700'}
              `}
              onClick={(e) => handleClick(e, heading.id)}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;