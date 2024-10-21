import React from 'react';
import { render, screen } from '@testing-library/react';
import FooterContentRecommendation from '@/components/FooterContentRecommendation';

// Mocking Next.js Link component
jest.mock('next/link', () => {
  const Link = ({ href, children, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
  Link.displayName = 'Link';
  return Link;
});

// Sample props
const mockContentRecommendation = {
  pre: {
    params: {
      type: 'blog',
      item: 'previous-post',
      title: 'Previous Post Title',
      description: 'Description of the previous post.',
    },
  },
  next: {
    params: {
      type: 'blog',
      item: 'next-post',
      title: 'Next Post Title',
      description: 'Description of the next post.',
    },
  },
};

const mockPreOnly = {
  pre: {
    params: {
      type: 'article',
      item: 'previous-article',
      title: 'Previous Article',
      description: 'Description of the previous article.',
    },
  },
};

const mockNextOnly = {
  next: {
    params: {
      type: 'article',
      item: 'next-article',
      title: 'Next Article',
      description: 'Description of the next article.',
    },
  },
};

describe('FooterContentRecommendation Component', () => {
  it('renders both pre and next links when contentRecommendation includes both', () => {
    render(<FooterContentRecommendation contentRecommendation={mockContentRecommendation} />);

    const preLink = screen.getByTestId('pre-link-recommendation');
    expect(preLink).toBeInTheDocument();
    expect(preLink).toHaveAttribute('href', '/blog/previous-post');

    const preTitle = screen.getByText('Previous Post Title');
    const preDescription = screen.getByText('Description of the previous post.');
    expect(preTitle).toBeInTheDocument();
    expect(preDescription).toBeInTheDocument();

    const nextLink = screen.getByTestId('next-link-recommendation');
    expect(nextLink).toBeInTheDocument();
    expect(nextLink).toHaveAttribute('href', '/blog/next-post');

    const nextTitle = screen.getByText('Next Post Title');
    const nextDescription = screen.getByText('Description of the next post.');
    expect(nextTitle).toBeInTheDocument();
    expect(nextDescription).toBeInTheDocument();
  });

  it('renders only the pre link when contentRecommendation includes only pre', () => {
    render(<FooterContentRecommendation contentRecommendation={mockPreOnly} />);

    const preLink = screen.getByTestId('pre-link-recommendation');
    expect(preLink).toBeInTheDocument();
    expect(preLink).toHaveAttribute('href', '/article/previous-article');

    const preTitle = screen.getByText('Previous Article');
    const preDescription = screen.getByText('Description of the previous article.');
    expect(preTitle).toBeInTheDocument();
    expect(preDescription).toBeInTheDocument();


    const nextLink = screen.queryByTestId('next-link-recommendation');
    expect(nextLink).not.toBeInTheDocument();
  });

  it('renders only the next link when contentRecommendation includes only next', () => {
    render(<FooterContentRecommendation contentRecommendation={mockNextOnly} />);

    const nextLink = screen.getByTestId('next-link-recommendation');
    expect(nextLink).toBeInTheDocument();
    expect(nextLink).toHaveAttribute('href', '/article/next-article');

    const nextTitle = screen.getByText('Next Article');
    const nextDescription = screen.getByText('Description of the next article.');
    expect(nextTitle).toBeInTheDocument();
    expect(nextDescription).toBeInTheDocument();

    const preLink = screen.queryByTestId('pre-link-recommendation');
    expect(preLink).not.toBeInTheDocument();
  });

  it('renders an empty footer when contentRecommendation is undefined', () => {
    render(<FooterContentRecommendation />);
    
    const footer = screen.getByRole('contentinfo'); 
    
    expect(footer).toBeInTheDocument();
    expect(footer).toBeEmptyDOMElement();
  });

  it('renders nothing when contentRecommendation has neither pre nor next', () => {
    render(<FooterContentRecommendation contentRecommendation={{}} />);
    
    const footer = screen.getByRole('contentinfo'); 
    
    expect(footer).toBeInTheDocument();
    expect(footer).toBeEmptyDOMElement();
  });
});
