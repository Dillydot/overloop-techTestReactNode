import React from 'react';
import ArticleCreate from '../ArticleCreate/ArticleCreate';
import { render, act, fireEvent } from '@testing-library/react';
import { listAuthors } from '../../../services/authors';
import { createArticle } from '../../../services/articles';

// Mock the article and author services
jest.mock('../../../services/articles');
jest.mock('../../../services/authors');

// Mock the useHistory hook from react-router-dom
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'),
useHistory: () => ({
push: mockHistoryPush,
}),
}));

// Test the ArticleCreate component
test('when a user creates a new article, the author should be included', async () => {
// Mock the response from the listAuthors service
listAuthors.mockResolvedValue([
{ id: 1, firstName: 'Jane', lastName: 'Doe' },
{ id: 2, firstName: 'John', lastName: 'Smith' },
]);

// Render the ArticleCreate component and wait for it to finish rendering
const { getByTestId } = render(<ArticleCreate />);
await act(() => Promise.resolve());

// Get the input fields and create button
const titleInput = getByTestId('title');
const contentInput = getByTestId('content');
const createButton = getByTestId('createButton');

// Change the input values
fireEvent.change(titleInput, {
target: {
value: 'New Article Title',
},
});
fireEvent.change(contentInput, {
target: {
value: 'New article content',
},
});

// Click the create button
fireEvent.click(createButton);

// Check that the createArticle function was called with the correct arguments
expect(createArticle).toHaveBeenCalledTimes(1);
expect(createArticle).toHaveBeenCalledWith({
author: {},
title: 'New Article Title',
content: 'New article content',
regions: [],
});
});