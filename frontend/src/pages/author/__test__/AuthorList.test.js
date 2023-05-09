import React from 'react';
import { render, act } from '@testing-library/react';
import AuthorList from '../AuthorList/AuthorList';
import { listAuthors } from '../../../services/authors';
import { BrowserRouter as Router } from 'react-router-dom';

// mock the service
jest.mock('../../../services/authors');

test('lists all authors', async () => {
  // set the mocked service response
  listAuthors.mockResolvedValue([
    { id: 1, firstName: 'Jane', lastName: 'Doe' },
    { id: 2, firstName: 'Bob', lastName: 'Smith' },
  ]);

  // render the component
  const { getByTestId } = render(
    <Router>
      <AuthorList />
    </Router>
  );

  // wait for the component to finish loading data
  await act(() => Promise.resolve());

  // get the elements for the first and second authors
  const firstNameEl1 = getByTestId('firstName1');
  const lastNameEl1 = getByTestId('lastName1');
  const firstNameEl2 = getByTestId('firstName2');
  const lastNameEl2 = getByTestId('lastName2');

  // assert that the service was called and the elements show the correct values
  expect(listAuthors).toHaveBeenCalledTimes(1);
  expect(firstNameEl1.textContent).toBe('Jane');
  expect(lastNameEl1.textContent).toBe('Doe');
  expect(firstNameEl2.textContent).toBe('Bob');
  expect(lastNameEl2.textContent).toBe('Smith');
});
