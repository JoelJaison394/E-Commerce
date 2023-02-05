const { addListener } = require("../app");
const Product = require("../Models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError")

// Create Product
exports.createProduct = catchAsyncErrors( async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
})


// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Update Product -- Admin route

exports.updateProduct = catchAsyncErrors( async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found ",400))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Get Product details
exports.getProductDetails = catchAsyncErrors( async (req,res,next) =>{
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found ",404))
  }

  res.status(200).json({
    success: true,
    product
  });
});

//Delete Product
exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found ",500))
    };

  await product.remove();

  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

