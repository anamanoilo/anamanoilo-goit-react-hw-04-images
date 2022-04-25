import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const inputHandler = e => {
    setQuery(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    onSubmit(query.trim());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={submitHandler}>
        <button type="submit" className="SearchForm-button">
          <AiOutlineSearch />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={inputHandler}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
