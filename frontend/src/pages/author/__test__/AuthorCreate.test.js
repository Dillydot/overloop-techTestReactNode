import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AuthorCreate from '../AuthorCreate/AuthorCreate';
import { createAuthor } from '../../../services/authors';

// Mock the createAuthor function from the service
jest.mock('../../../services/authors');

// Mock the useHistory hook from react-router-dom
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

// Test case for creating an author with first and last name
test('Creates an author with first name and last name', () => {
  // Set up the mockResolvedValue for the createAuthor function
  createAuthor.mockResolvedValue({ success: true });

  // Render the AuthorCreate component
  const { getByTestId } = render(<AuthorCreate />);

  // Get the input elements and button element by test id
  const firstNameEl = getByTestId('firstName');
  const lastNameEl = getByTestId('lastName');
  const buttonEl = getByTestId('createButton');

  // Simulate typing in the first and last name inputs
  fireEvent.change(firstNameEl, {
    target: {
      value: 'Jane',
    },
  });
  fireEvent.change(lastNameEl, {
    target: {
      value: 'Doe',
    },
  });

  // Simulate clicking on the create button
  fireEvent.click(buttonEl);

  // Check that createAuthor was called with the correct parameters
  expect(createAuthor).toHaveBeenCalledTimes(1);
  expect(createAuthor).toHaveBeenCalledWith({
    firstName: 'Jane',
    lastName: 'Doe',
  });
});
