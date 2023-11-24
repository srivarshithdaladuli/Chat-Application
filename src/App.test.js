// Importing testing utilities from @testing-library/react
import { render, screen } from '@testing-library/react';
// Importing the main App component to be tested
import App from './App';

// Test case to check if the "learn react" link is rendered
test('renders learn react link', () => {
  // Rendering the App component
  render(<App />);
  // Attempting to find an element with text content matching the regex 'learn react' (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);
  // Asserting that the found element is in the document
  expect(linkElement).toBeInTheDocument();
});

// Comments explain the purpose and steps of the test case
