const csv = require('csv-parser')
const fs = require('fs')
const mongoose = require('mongoose');
const Product = require("./schema/city");

// To avoid the new line when printing
console.log = function (d) {
  process.stdout.write(d);
};


// localhost connection 
mongoose.connect('mongodb://localhost:27017/ProductsDB',{
    useNewUrlParser:true
})

// For City collectioon
var count=0;
fs.createReadStream('product.csv')
  .pipe(csv())
  .on('data', (data) => {
    let zipArr = data['zips'].split(" ");
    var newCity = new City({
      cityName: data['city'],
      state:data['state_name'],
      cityDisplayName:data['display_name'],
      zips:zipArr,
    });

    newCity.save(function(err, item) {
      if (item) {
        count++
        console.log(", "+count);
      }
      if (err) {
       console.log("Error")
      }
    });
    })
  .on('end', () => {
    console.log("Done");
  });

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'ProductsDB';

// // Create a new MongoClient
// const client = new MongoClient(url);

// // Use connect method to connect to the Server
// client.connect(function (err) {
// 	assert.equal(null, err);
// 	console.log('Connected successfully to server');

// 	const db = client.db(dbName);

// 	client.close();
// });

// const insertDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('documents');
//     // Insert some documents
//     collection.insertMany([
//       {a : 1}, {a : 2}, {a : 3}
//     ], function(err, result) {
//       assert.equal(err, null);
//       assert.equal(3, result.result.n);
//       assert.equal(3, result.ops.length);
//       console.log("Inserted 3 documents into the collection");
//       callback(result);
//     });
//   }