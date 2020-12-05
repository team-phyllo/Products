const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	slogan: String,
	description: String,
	category: String,
	default_price: Number,
	features: {
		feature: String,
		value: String,
	},
	styles: [
		{
			style_id: Number,
			name: String,
			original_price: Number,
			sale_price: Number,
			default: Boolean,
			photos: [],
		},
	],
});

productSchema.pre('save', async function (next) {
	var product = this;
	if (this.isNew) {
		try {
			product._id = new mongoose.Types.ObjectId();
			return next();
		} catch (error) {
			return next(error);
		}
	} else {
		return next();
	}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
