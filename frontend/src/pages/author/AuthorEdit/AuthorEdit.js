import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import GoBackButton from '../../../components/GoBackButton/GoBackButton';

import { ROUTE_AUTHOR_LIST } from '../../../constants';
import { getAuthor, editAuthor } from '../../../services/authors';

const AuthorEdit = () => {
  // useHistory allows us to programmatically navigate between routes
  const history = useHistory();

  // useParams allows us to extract the dynamic parameter from the URL
  const { authorId } = useParams();

  // We use state hooks to manage the values of the inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // We use state hook to manage error messages
  const [error, setError] = useState();

  useEffect(() => {
    // We use the authorId parameter to fetch the author data and populate the form
    const fetchAuthor = async () => {
      const data = await getAuthor(authorId);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    };

    fetchAuthor();
  }, [authorId]);

  const handleSave = async () => {
    // We create a payload object with the new values for the author
    const payload = { firstName, lastName };

    try {
      // We call the editAuthor service function with the authorId and the new payload
      await editAuthor(authorId, payload);
    } catch (err) {
      // If there is an error, we set the error message in state
      setError(err.response.data.message);
      return;
    }

    // If there are no errors, we navigate to the author list page
    history.push(ROUTE_AUTHOR_LIST);
  };

  return (
    <div>
      <h1>Edit Author</h1>

      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            // We use an onChange event to update the value of the firstName state
            onChange={(event) => setFirstName(event.target.value)}
            data-testid="firstName"
          />

          {/* We render the error message if there is an error */}
          {error && <p className="text-danger">{error}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            // We use an onChange event to update the value of the lastName state
            onChange={(event) => setLastName(event.target.value)}
            data-testid="lastName"
          />
        </Form.Group>

        {/* We use the handleSave function as the onClick event for the button */}
        <Button variant="primary" onClick={handleSave} data-testid="editButton">
          Save Author
        </Button>

        {/* We use the GoBackButton component to create a back button */}
        <GoBackButton />
      </Form>
    </div>
  );
};

export default AuthorEdit;
