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

const getProduct = (productID) => {
	return db
		.task(async (t) => {
			const product = await t.any(
				`SELECT id, name, slogan, description, category, default_price FROM products WHERE id=$1;`,
				[productID]
			);
			const features = await t.any(
				`SELECT feature, value FROM features WHERE productid = $1;`,
				[productID]
			);
			return { product, features };
		})
		.then((data) => {
			return data;
		})
		.catch((err) => console.log('there was an error:', err));
};

const getStyles = (productID) => {
	return db
		.task(async (t) => {
			const styles = await t.any(
				`SELECT id, name, original_price, sale_price, default_style::INT as "default?" FROM styles WHERE product_id=$1;`,
				[productID]
			);
			const photos = await t.any(
				`SELECT thumbnail_url, url FROM features WHERE styleid = $1;`,
				[productID]
			);
			const skus = await t.any(
				`SELECT id, size, quantity FROM skus WHERE styleid = $1`,
				[sty]
			);
			return { product, features };
		})
		.then((data) => {
			return data;
		})
		.catch((err) => console.log('there was an error:', err));
};

module.exports = { getProducts, getProduct };
