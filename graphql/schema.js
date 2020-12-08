const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type RootQuery {
    getProducts:
  }

  schema {

  }
`);
