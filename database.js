const pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://postgres:pass123@localhost:5433/postgres');

const getProducts = async (page = 1, count = 5) => {
	return db
		.any(
			`
	SELECT
	  id,
	  name,
	  slogan,
	  description,
	  category,
	  default_price
	FROM products
	LIMIT $1
	OFFSET $2;
  `,
			[count, page]
		)
		.then((results) => {
			return results;
		})
		.catch((err) => {
			return err;
		});
};

const getProduct = async (productID) => {
	let productResults;
	let featuresResults;
	db.any(
		`
  SELECT
  id,
  name,
  slogan,
  description,
  category,
  default_price
  FROM products
  WHERE id=$1;`,
		[productID]
	)
		.then((productInfo) => {
			productResults = productInfo;
			console.log(productInfo);
		})
		.catch((err) => err);

	db.any(
		`
  SELECT
    feature,
    value
  FROM features
  WHERE productid = $1;
    `,
		[productID]
	)
		.then((features) => {
			featuresResults = features;
		})
		.catch((err) => err);

	let productWithFeatures = {};
};

const getStyles = async (productID) => {
	db.any(`
  SELECT
    style_id,
    name,
    original_price,
    default?,
  `);
};

module.exports = { getProducts, getProduct };
