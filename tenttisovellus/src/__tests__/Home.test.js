import Home from '../Home';
import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('Is hero image present in the Home component', () => {
  render(<Home />);
  const heroImage = screen.getByAltText('abstract human standing');
  expect(heroImage).toBeInTheDocument();
});

test('Is title present on the landing page', () => {
  render(<Home />);
  const heading = screen.getByText('Tervetuloa tenttisovellukseen! 🍜');
  expect(heading).toBeInTheDocument();
});
