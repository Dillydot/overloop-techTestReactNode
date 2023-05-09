import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';

const GoBackButton = ({ link }) => {
  const history = useHistory();

  return (
    <Button
      variant="secondary"
      onClick={() => history.goBack()}
      style={{ marginLeft: '5px' }}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
