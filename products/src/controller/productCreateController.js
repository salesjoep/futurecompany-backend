const Product = require('../model/product')
const catchAsync = require('./../error/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
    const products = await Product.create({
        name: req.body.name,
        category: req.body.category,
        cost: req.body.cost,
        basePrice: req.body.basePrice,
        tag: req.body.tag,
        price: req.body.price
    })

    res.status(400).json({
        status: 'success',
        data: {
            products
        }
    });
});