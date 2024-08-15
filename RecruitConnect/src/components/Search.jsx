import React, { Component } from 'react';
import "../Searchbar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      location: '',
      jobTitle: ''
    };

    this.handleKeywordsChange = this.handleKeywordsChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleJobTitleChange = this.handleJobTitleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleKeywordsChange(e) {
    this.setState({ keywords: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleJobTitleChange(e) {
    this.setState({ jobTitle: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    const { keywords, location, jobTitle } = this.state;
    this.props.onSearch({ keywords, location, jobTitle });
  }

  render() {
    return (
      <form className="search-bar" onSubmit={this.handleSearch}>
        <input
          type="text"
          value={this.state.keywords}
          onChange={this.handleKeywordsChange}
          placeholder="Keywords"
        />
        <input
          type="text"
          value={this.state.location}
          onChange={this.handleLocationChange}
          placeholder="Location"
        />
        <input
          type="text"
          value={this.state.jobTitle}
          onChange={this.handleJobTitleChange}
          placeholder="Job Title"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;
