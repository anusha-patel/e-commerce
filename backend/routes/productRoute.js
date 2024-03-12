import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController, getProductController, getSingleProduct, productCategoryController, productCountController, productDeleteController, productFilterController, productListController, productPhotoController, releatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'



const router = express.Router();

//create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//get all products
router.get('/get-product', getProductController)

//get one products
// router.get('/get-product/:slug' , getSingleProduct)
router.get('/get-product/:pid' , getSingleProduct)

//get photo
router.get('/product-photo/:pid', productPhotoController)

// delete product
router.delete('/delete-product/:pid', productDeleteController);

// filter produts
router.post('/product-filter', productFilterController)

//product count 
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController)

//search product
router.get('/search/:keyword', searchProductController)

//similar product
router.get('/related-product/:pid/:cid', releatedProductController)

//category wise product
router.get('/product-category/:slug', productCategoryController)

// payment routes
// token
router.get('/braintree/token', braintreeTokenController)

//payment
router.post('/braintree/payment', requireSignIn,brainTreePaymentController)

export default router;