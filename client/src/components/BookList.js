import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBooks() {
    const { loading, books } = this.props.data;

    if (loading === true) return <p>Loading Books...</p>;
    return books.map(book => (
      <li key={book.id} onClick={() => this.setState({ selected: book.id })}>
        {book.name}
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
