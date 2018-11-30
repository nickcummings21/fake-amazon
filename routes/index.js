
const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/fake-amazon-products');

const productSchema = mongoose.Schema({
    name: String,
    price: String,
    ordered: Number,
    url: String
});

const Product = mongoose.model('Product', productSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
});


router.post('/add-product', function (req, res, next) {
    console.log('Registering user');

    let newProduct = new Product(req.body);
    console.log(newProduct);

    newProduct.save(function (err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

router.get('/get-products', function (req, res, next) {
    console.log('Getting Products');

    Product.find(function (err, products) {
        if (err) return console.error(err);
        else {
            console.log(products);
            res.json(products);
        }
    }).sort( { name: 1 } );
});

router.delete('/remove-product', function (req, res) {
    console.log('DELETE product route');

    Product.deleteMany({ name: req.query.name }, function (err) {
        console.log('Removed product.');
    });
    res.sendStatus(200);
});


module.exports = router;
