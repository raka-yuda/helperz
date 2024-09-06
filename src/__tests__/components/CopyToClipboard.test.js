import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CopyToClipboard from '@/components/CopyToClipboard'; 

describe('CopyToClipboard', () => {
    beforeAll(() => {
      Object.assign(navigator, {
        clipboard: {
          writeText: jest.fn().mockImplementation(() => Promise.resolve()),
        },
      });
    });
  
    it('should change text to "Copied!" after clicking the button', async () => {
      const mockCode = 'Some code to copy';
      render(<CopyToClipboard code={mockCode} />);
  
      const button = screen.getByRole('button', { name: /Copy to Clipboard/i });
  
      fireEvent.click(button);
  
      expect(button).toHaveTextContent('✏️Copied!');
  
      await waitFor(() => expect(button).toHaveTextContent('✏️Copy to Clipboard'), { timeout: 2000 });
  
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockCode);
    });
  });
