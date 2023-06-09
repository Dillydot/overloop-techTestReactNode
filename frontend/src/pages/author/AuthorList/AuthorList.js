import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { listAuthors } from '../../../services/authors';
import { ROUTE_AUTHOR_CREATE, ROUTE_AUTHOR_PREFIX } from '../../../constants';

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        // Fetch the list of authors and set them in state
        const data = await listAuthors();
        setAuthors(data);
      } catch (error) {
        console.error('Error fetching authors:', error);
        // Set error message in state if fetch fails
        // Note: In a production app, you would want to display a user-friendly error message
        // and/or give the user the option to retry the fetch
        setAuthors([]);
      }
    };

    fetchAuthors();
  }, []);

  const renderAuthors = () =>
    authors.map((author) => {
      const { id, firstName, lastName } = author;

      return (
        <tr key={id}>
          <td>
            <Link
              to={`${ROUTE_AUTHOR_PREFIX}/${id}`}
              data-testid={`firstName${id}`}
            >
              {firstName}
            </Link>
          </td>
          <td data-testid={`lastName${id}`}>{lastName}</td>
        </tr>
      );
    });

  return (
    <div>
      <h1>Authors</h1>
      <Link className="d-block mb-3" to={ROUTE_AUTHOR_CREATE}>
        Create a new Author
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>{renderAuthors()}</tbody>
      </Table>
    </div>
  );
};

export default AuthorList;
