const { Query } = require('./Query');
const { auth } = require('./Mutation/auth');
const { post } = require('./Mutation/post');
const { AuthPayload } = require('./AuthPayload');
const { envelope } = require('./Mutation/envelope');

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...envelope,
  },
  AuthPayload,
};
