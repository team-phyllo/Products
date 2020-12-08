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

app.get('/products/:products_id', async (req, res) => {
	const results = await db.getProduct(req.params.products_id);

	//format the data received
	let { product, features } = results;
	let productWithFeatures = {
		id: product[0].id,
		name: product[0].name,
		slogan: product[0].slogan,
		description: product[0].description,
		category: product[0].category,
		default_price: product[0].default_price,
		features: features,
	};
	res.send(productWithFeatures);
});

// console.log('product with features 1:', productWithFeatures);

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
