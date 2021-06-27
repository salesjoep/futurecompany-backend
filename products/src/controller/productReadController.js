const Product = require('../model/product');
const catchAsync = require('./../error/catchAsync');

exports.getProducts = catchAsync(async (req, res) => {

    // Build query
    const queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-price')
    }

    const products= await query;

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    })
});

exports.getProduct = catchAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
});