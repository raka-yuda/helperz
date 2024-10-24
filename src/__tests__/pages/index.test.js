import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '@/pages/index'
import '@testing-library/jest-dom'

const cheatsheets = [
  {
    "type": "react-hooks",
    "title": "React Hooks",
    "cheatsheets": [
      {
        "item": "useDebounce",
        "title": "useDebounce Hook",
        "description": "A detailed look at the useDebounce hook in React.",
        "path": "/cheatsheets/react-hooks/useDebounce"
      },
      {
        "item": "usePrevious",
        "title": "usePrevious Hook",
        "description": "A hook to get the previous value of a state or prop in React.",
        "path": "/cheatsheets/react-hooks/usePrevious"
      }
    ],
  }
];

jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  }
});

describe('HomePage', () => {
  it('renders page correctly', async () => {
    render(<Home cheatsheets={cheatsheets} />);
    const title = screen.getByRole('heading');

    expect(title).toBeInTheDocument();
  });

  it('renders the cheatsheet titles as buttons and toggles content', async () => {
    render(<Home cheatsheets={cheatsheets} />);

    for (const cheat of cheatsheets) {
      const titleButton = screen.getByRole('button', { name: cheat.title });
      expect(titleButton).toBeInTheDocument();

      for (const sheet of cheat.cheatsheets) {
        expect(screen.queryByText(sheet.title)).not.toBeInTheDocument();
        expect(screen.queryByText(sheet.description)).not.toBeInTheDocument();
      }

      fireEvent.click(titleButton);

      for (const sheet of cheat.cheatsheets) {
        expect(await screen.findByText(sheet.title)).toBeInTheDocument();
        expect(screen.getByText(sheet.description)).toBeInTheDocument();
      }

      fireEvent.click(titleButton);

      await waitFor(() => {
        for (const sheet of cheat.cheatsheets) {
          expect(screen.queryByText(sheet.title)).not.toBeInTheDocument();
          expect(screen.queryByText(sheet.description)).not.toBeInTheDocument();
        }
      }, { timeout: 1000 });
    }
  });
});