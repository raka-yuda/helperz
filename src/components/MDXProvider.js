
// src/components/MDXProvider.js
import React from 'react';
import CopyToClipboard from './CopyToClipboard';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import { MDXRemote } from 'next-mdx-remote';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

// Define components you want to use in MDX files
const components = {
  CopyToClipboard,
  code: ({ children, className }) => {
    if (className) {
      return <code className={className}>{children}</code>;
    }
    return <code>{children}</code>;
  },
  // Add more components here
};

const MDXProvider = ({ source }) => (
  <MDXRemote {...source} components={components} />
);

export default MDXProvider;
