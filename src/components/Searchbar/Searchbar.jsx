import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  inputHandler = e => {
    this.setState(prev => ({ ...prev, query: e.target.value }));
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query.trim());
  };

  render() {
    const { query } = this.state;
    const { inputHandler, submitHandler } = this;
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
  }
}

export default Searchbar;
