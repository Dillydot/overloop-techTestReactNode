import React, { useState, useEffect } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import { listAuthors } from '../../services/authors';

const AuthorDropdown = ({ value, onChange }) => {
  // Set up state for authors list
  const [authors, setAuthors] = useState([]);

  // Fetch authors list from server when component mounts
  useEffect(() => {
    // Define async function to fetch authors
    const fetchAuthors = async () => {
      // Call listAuthors function from the authors service
      const data = await listAuthors();

      // Add a default option to the beginning of the authors list
      data.unshift({
        authorId: 0,
        title: '- None author selected -',
      });

      // Set the authors list state with the fetched data
      setAuthors(data);
    };

    fetchAuthors(); // Call fetchAuthors function
  }, []);

  // Render the author dropdown list
  return (
    <div>
      <DropdownList
        value={value}
        data={authors}
        textField={(author) =>
          author?.firstName
            ? author.firstName + ' ' + author?.lastName
            : author?.title
        }
        valueField="id"
        onChange={onChange}
        allowCreate={false}
        data-testid="authorDropdown"
      />
    </div>
  );
};

export default AuthorDropdown;
