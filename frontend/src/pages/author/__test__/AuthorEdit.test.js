import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import AuthorEdit from '../AuthorEdit/AuthorEdit';
import { editAuthor, getAuthor } from '../../../services/authors';

jest.mock('../../../services/authors');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    authorId: 1,
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('Edits an author\'s first name and last name', async () => {
  getAuthor.mockResolvedValue({
    firstName: 'Jane',
    lastName: 'Doe',
  });

  editAuthor.mockResolvedValue({
    success: true,
  });

  const { getByTestId } = render(<AuthorEdit />);

  await act(() => Promise.resolve());

  const firstNameEl = getByTestId('firstName');
  const lastNameEl = getByTestId('lastName');
  const buttonEl = getByTestId('editButton');

  expect(firstNameEl.value).toBe('Jane');
  expect(lastNameEl.value).toBe('Doe');

  fireEvent.change(firstNameEl, {
    target: {
      value: 'Bob',
    },
  });
  fireEvent.change(lastNameEl, {
    target: {
      value: 'Smith',
    },
  });

  fireEvent.click(buttonEl);

  expect(editAuthor).toHaveBeenCalledTimes(1);
  expect(editAuthor).toHaveBeenCalledWith(1, {
    firstName: 'Bob',
    lastName: 'Smith',
  });
});
