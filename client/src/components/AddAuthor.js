import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

class AddAuthor extends Component {
  render() {
    return <div> textInComponent </div>;
  }
}

export default graphql()(AddAuthor);
