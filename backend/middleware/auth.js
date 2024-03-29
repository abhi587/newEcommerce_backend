const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // const { token } = req.cookies;
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};


// exports.isAuthenticatedAdmin = catchAsyncErrors(async (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];

//   if (!token) {
//     return next(new ErrorHander("Please Login to access this resource", 401));
//   }

//   try {
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decodedData.id);

//     if (!user || user.role !== 'admin') {
//       return next(new ErrorHander("Unauthorized access", 403));
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in isAuthenticatedAdmin middleware:", error);
//     return next(new ErrorHander("Error authenticating admin", 500));
//   }
// });
