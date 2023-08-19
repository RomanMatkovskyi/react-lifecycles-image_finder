import { Component } from 'react';

class SearchBar extends Component {
  state = {
    search: '',
  };

  handleSearchBar = event => {
    this.setState({ search: event.target.value });
  };

  confirmSearch = event => {
    event.preventDefault();
    this.props.onSearch(this.state.search, 1);
    this.setState({ currentSearch: this.state.search, search: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.confirmSearch}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            value={this.state.search}
            onChange={this.handleSearchBar}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
