const User = require('./../model/user');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../errors/appError')

const filterObj = (obj, ...allowedFields) =>{
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.updateProfile = catchAsync(async (req,res,next) => {
    // Create error if user post password data
    if(req.body.password || req.body.passwordConfirm)
        return next(new AppError('This route is not for password update',400));

    //Update user document
    const filterBody = filterObj(req.body, 'name', 'email');
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {new:true, runValidators: true});

    res.status(200).json({
        status: 'success',
        data: {
            user: updateUser
        }
    })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false});

    res.status(204).json({
        status: 'Success',
        data: null
    })
});