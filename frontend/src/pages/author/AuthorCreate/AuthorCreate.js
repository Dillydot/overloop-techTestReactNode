import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_AUTHOR_LIST } from '../../../constants';
import { createAuthor } from '../../../services/authors';
import GoBackButton from '../../../components/GoBackButton/GoBackButton';

const AuthorCreate = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState();

  const handleSave = async () => {
    // Prepare the payload for creating an author
    const payload = { firstName, lastName };

    try {
      // Call the createAuthor service function to create the author
      await createAuthor(payload);
    } catch (err) {
      // If there's an error, set the error message state with the error message returned from the server
      setError(err.response?.data?.message || 'Failed to create author.');
      return;
    }

    // If author is created successfully, redirect to the author list page
    history.push(ROUTE_AUTHOR_LIST);
  };

  return (
    <div>
      <h1>Create Author</h1>
      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            data-testid="firstName"
          />
          {error && <p className="text-danger">{error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            data-testid="lastName"
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSave}
          data-testid="createButton"
        >
          Create Author
        </Button>
        <GoBackButton/>
      </Form>
    </div>
  );
};

export default AuthorCreate;
