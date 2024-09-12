import { render, screen, fireEvent } from '@testing-library/react';
import TableOfContents from '@/components/TableOfContents';

beforeAll(() => {
	global.IntersectionObserver = class {
		constructor(callback) {
			this.callback = callback;
		}

		observe(element) {
			this.callback([{ target: element, isIntersecting: true }]);
		}

		  unobserve() {}

		disconnect() { }
	};
});
const headings = [
	{ id: 'heading1', text: 'Heading 1' },
	{ id: 'heading2', text: 'Heading 2' },
	{ id: 'heading3', text: 'Heading 3' },
];

describe('TableOfContents', () => {
	it('renders all the headings', () => {
		render(<TableOfContents headings={headings} />);

		headings.forEach(({ text }) => {
			const headingLink = screen.getByText(text);
			expect(headingLink).toBeInTheDocument();
		});
	});

	it('scrolls to the correct heading on click', () => {
		render(
			<>
				{headings.map(({ id, text }) => (
					<div key={id} id={id} style={{ height: '100vh' }}>{text}</div>
				))}
				<TableOfContents headings={headings} />
			</>
		);

		const headingLink = screen.getByTestId('toc-link-heading1');
		const headingElement = document.getElementById('heading1');

		headingElement.scrollIntoView = jest.fn();

		fireEvent.click(headingLink);
		expect(headingElement.scrollIntoView).toHaveBeenCalledWith({
			behavior: 'smooth',
		});
	});
});