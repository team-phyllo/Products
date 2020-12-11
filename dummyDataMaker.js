'use strict';

// generate random product_Id numbers for artillery tests
module.exports.generateRandomID = (userContext, events, done) => {
	const productID = (min = 1, max = 1000011) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return String(Math.floor(Math.random() * (max - min) + min));
	};
	userContext.vars.productID = productID();
	return done();
};
