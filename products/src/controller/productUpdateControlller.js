const Product = require('../model/product');
const catchAsync = require('./../error/catchAsync');

exports.updateProduct = catchAsync(async (req, res) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
});

exports.deleteProduct = catchAsync(async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
        data: {
            product
        }
    })
});