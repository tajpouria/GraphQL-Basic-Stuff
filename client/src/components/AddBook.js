import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
  }

  displayAuthors() {
    const { loading, authors } = this.props.getAuthorsQuery;

    if (loading === true) return <option>Loading Authors...</option>;
    return authors.map(author => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { name, genre, authorId } = this.state;

    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="field">
          <label>Book name </label>
          <input
            type="text"
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
        </div>

        <div className="field">
          <label>Genre </label>
          <input
            type="text"
            onChange={e => {
              this.setState({ genre: e.target.value });
            }}
          />
        </div>

        <div className="field">
          <label>Author </label>
          <select
            onChange={e => {
              this.setState({ authorId: e.target.value });
            }}
          >
            <option>Select author</option>
            {this.displayAuthors()}
          </select>

          <button>+</button>
        </div>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
