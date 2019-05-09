import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;

    if (!book) return <p>No book selected...</p>;
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul>
          {book.author.books.map(book => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return this.displayBookDetails();
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: { id: props.bookId }
    };
  }
})(BookDetails);
