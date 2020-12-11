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
				`SELECT style_id, name, original_price, sale_price, default_style::INT as "default?" FROM styles WHERE product_id=$1;`,
				[productID]
			);
			const stylePhotos = await t.any(
				'SELECT styleid, thumbnail_url, url FROM photos WHERE styleid IN (SELECT style_id FROM styles WHERE product_id=$1);',
				[productID]
			);

			const styleSkus = await t.any(
				`SELECT styleid, id, size, quantity FROM skus WHERE styleid IN (SELECT style_id FROM styles WHERE product_id=$1);`,
				[productID]
			);
			return { styles, stylePhotos, styleSkus };
		})
		.then((data) => {
			return data;
		})
		.catch((err) => console.log('there was an error:', err));
};

const getRelatedProducts = (productID) => {
	return db
		.any(
			'SELECT related_product_id FROM related WHERE current_product_id=$1;',
			[productID]
		)
		.then((data) => {
			return data;
		})
		.catch((err) => console.log('there was an error:', err));
};

module.exports = { getProducts, getProduct, getStyles, getRelatedProducts };
