const { Query } = require('./Query');
const { auth } = require('./Mutation/auth');
const { image } = require('./Mutation/image');
const { AuthPayload } = require('./AuthPayload');
const { envelope } = require('./Mutation/envelope');

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...image,
    ...envelope,
  },
  AuthPayload,
};
