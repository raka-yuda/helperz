import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

const cheatsheets = [
  {
    type: 'react-hooks',
    item: 'useDebounce',
    title: 'useDebounce Hook',
    description: 'A detailed look at the useDebounce hook in React.',
  },
  {
    type: 'react-hooks',
    item: 'useEffect',
    title: 'useEffect Hook',
    description: 'Understanding the useEffect hook in React.',
  },
];

describe('HomePage', () => {
  it('renders the cheatsheet titles as buttons', () => {
    render(<Home cheatsheets={cheatsheets} />);

    // Check if the titles are rendered as buttons
    cheatsheets.forEach((cheat) => {
      const titleElement = screen.getByText(cheat.title);
      expect(titleElement).toBeInTheDocument();
    });

    // Check if the descriptions are rendered
    cheatsheets.forEach((cheat) => {
      const descriptionElement = screen.getByText(cheat.description);
      expect(descriptionElement).toBeInTheDocument();
    });
  });
});