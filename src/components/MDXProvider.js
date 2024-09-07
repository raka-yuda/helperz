import React from 'react';
import CopyToClipboard from './CopyToClipboard';
import 'tailwindcss/tailwind.css';
import { MDXRemote } from 'next-mdx-remote';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const components = {
  CopyToClipboard,
  pre: ({ children }) => children,
  code: ({ className, children }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const isInline = !className;

    if (isInline) {
      // Remove backticks from inline code
      const codeContent = typeof children === 'string' ? children.replace(/`/g, '') : children;
      return (
        <code
          className="px-1 py-0.5 rounded bg-gray-200 text-gray-800 text-sm font-mono"
        >
          {codeContent}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{
          margin: '1.5em 0',
          borderRadius: '0.375rem',
          padding: '1em',
        }}
      >
        {children}
      </SyntaxHighlighter>
    );
  },
  h1: ({ children }) => {
    const id = children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h1 id={id}>{children}</h1>;
  },
  h2: ({ children }) => {
    const id = children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }) => {
    const id = children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h3 id={id}>{children}</h3>;
  },
  h4: ({ children }) => {
    const id = children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h4 id={id}>{children}</h4>;
  },
  h5: ({ children }) => {
    const id = children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h5 id={id}>{children}</h5>;
  },
  h6: ({ children }) => {
    const id = children.toLowerCase().replace(/[^\w]+/g, '-');
    return <h6 id={id}>{children}</h6>;
  },
};

const MDXProvider = ({ source }) => (
  <MDXRemote {...source} components={components} />
);

export default MDXProvider;