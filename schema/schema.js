const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = require('graphql');
const _ = require('lodash');

const books = [
  { id: '1', name: 'Animals farm', genre: 'Real', authorId: '1' },
  { id: '2', name: 'Rotterdam', genre: 'Drama', authorId: '2' },
  { id: '3', name: 'Angelo', genre: 'Sci-fi', authorId: '3' },
  { id: '3', name: 'Final Fantasy iv', genre: 'Fantasy', authorId: '3' }
];

const authors = [
  { id: '1', name: 'Patrick', age: 44 },
  { id: '2', name: 'Sponge bob', age: 50 },
  { id: '3', name: 'Crusty crab', age: 66 }
];

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },

    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },

    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books;
      }
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
