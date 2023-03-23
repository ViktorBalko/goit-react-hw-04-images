import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [request, setRequest] = useState('');

  const handleRequestChange = evt => {
    setRequest(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (request.trim() === '') {
      return toast.error('Enter request');
    }

    onSubmit(request);
    setRequest('');
  };

  return (
    <header className={styles.SearchBar}>
      <form className={styles.SearchBarForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchBarButton}>
          search
        </button>
        <input
          className={styles.SearchBarInput}
          type="text"
          name="request"
          value={request}
          onChange={handleRequestChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
