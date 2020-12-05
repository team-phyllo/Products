var pgp = require('pg-promise');
var db = pgp('postgres://postgres:pass123@host:5433/postgres');
const { graphqlHttp } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const resolvers = require('.graphql/resolvers');

const getAllProducts = async (productID) => {
	return db.any('SELECT * FROM products WHERE product_id = ');
};

app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
}));


module.exports = db;
