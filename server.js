const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const db = require('./database.js');

const app = express();
app.listen(5000, () => console.log('Server Running'));

app.get('/products', (req, res) => {
	// console.log('success');
	// res.end('success');
	db.getProducts(req.query.page, req.query.results)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => console.log('There was an error getting products:', err));
});

app.get('/products/:products_id', (req, res) => {
	db.getProduct(req.params.product_id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => console.log('There was an error getting products:', err));
});

//GRAPHQL CODE:
// const {
// 	GraphQLSchema,
// 	GraphQLObjectType,
// 	GraphQLString,
// 	GraphQList,
// 	GraphQLInt,
// 	GraphQLNonNull,
// } = require('graphql');

// const ProductType = new GraphQLObjectType({
// 	name: 'Product',
// 	description: 'This represents a product.',
// 	fields: () => ({
// 		id: { type: GraphQLNonNull(GraphQLInt) },
// 		name: { type: GraphQLNonNull(GraphQLString) },
// 		slogan: { type: GraphQLNonNull(GraphQLString) },
// 		description: { type: GraphQLNonNull(GraphQLString) },
// 		category: { type: GraphQLNonNull(GraphQLString) },
// 		default_price: { type: GraphQLInt },
// 	}),
// });

// const RootQueryType = new GraphQLObjectType({
// 	name: 'Query',
// 	description: 'Root Query',
// 	fields: () => ({
// 		products: {
// 			type: ProductType,
// 			description: 'List of Products',
// 		},
// 	}),
// });

// const schema = new GraphQLSchema({
// 	query: new GraphQLObjectType({}),
// });

// app.use(
// 	'/graphql',
// 	graphqlHTTP({
// 		schema: schema,
// 		graphiql: true,
// 	})
// );
