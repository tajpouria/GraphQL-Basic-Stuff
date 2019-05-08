const mongoose = require('mongoose');
const express = require('express');
const winston = require('winston');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

mongoose.connect(
  'mongodb://localhost:27017/graphQL',
  { useNewUrlParser: true },
  err => {
    if (err) return winston.error(err.message, err);
  }
);

mongoose.connection.once('open', () => {
  winston.info('Connected to db.');
});

const app = express();
winston.add(winston.transports.File, { filename: 'logFile.log' });

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const port = process.env.PORT || 4000;

app.listen(port, () => winston.info(`listening on port ${port}`));
