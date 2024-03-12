import express from 'express';
import {forgotPasswordController, getAllOrderController, getOrderController, orderStatusController, registerController, updateProfilController} from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn} from '../middleware/authMiddleware.js';


//router object 
const router = express.Router()

//routing 
//register || METHOD POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)


// forgot password route 
router.post("/forgot-password", forgotPasswordController )


// protected/ private user route 

router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });


// protected/ private admin  route 

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//test route
router.get('/test',requireSignIn,isAdmin, testController)

//update profile
router.put('/profile', requireSignIn, updateProfilController)

//orders
router.get('/orders', requireSignIn, getOrderController)

// all orders
router.get('/all-orders', requireSignIn,isAdmin, getAllOrderController)


//order status update

router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)

export default router