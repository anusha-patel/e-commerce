import userModel from '../models/userModel.js';
import orderModel from '../models/orderModel.js'
import { comparePassword, hashPassword} from './../helpers/authHelpers.js';
import JWT from 'jsonwebtoken'

export const registerController = async(req,res)=>{
    try {
        const{name,email,password,phone,address,answer} = req.body

        //validation
        if(!name){
            return res.send({message:'name is Required'})
        }

        if(!email){
            return res.send({message:'email is Required'})
        }

        if(!password){
            return res.send({message:'password is Required'})
        }

        if(!phone){
            return res.send({message:'phone no is Required'})
        }

        if(!address){
            return res.send({messager:'address is Required'})
        }

        if(!answer){
            return res.send({messager:'answer is Required'})
        }

        //check user
        const existingUser = await userModel.findOne({email});


        //existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register Please Login'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({name,email,phone,answer,address,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:'user Registerd successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in registration',
            error,
        })
        
    }

};

//post login route

export const  loginController = async(req,res) => {
    try {
        const{email,password} = req.body
        //validation
        if(!email || !password) {
            res.status(400).send({
                success:false,
                message:'invalied username or password',
            });
        }
         //check user
         const user = await userModel.findOne({email})
         if(!user){
            return res.status(404).send({
                success:false,
                message:'email is not valid', 
            });
         }
        const match = await comparePassword(password,user.password)

        if(!match){
            return res.status(200).send({
                success:false,
                message:'invalied password'
            });
        }

        //token creation
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        });
        res.status(201).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login',
            error
        })
        
    }

}

// forgot password controller

export const forgotPasswordController = async(req,res) =>{
    try {
        //"{email,answer,newPassword}" are names must match with model/schema "userModel.js" names 
        const {email,answer,newpassword} = req.body;

        if(!email){
            res.status(400).send({
                message:'email is required'
            })
        }

        if(!answer){
            res.status(400).send({
                message:'answer is required'
            })
        }
        // 3:38:34 
        if(!newpassword){
            res.status(400).send({
                message:'newpassword is required'
            })
        }

        //check email

        // Finding the User
        const user = await userModel.findOne({email,answer})

        //validation
        if(!user){
          return res.status(400).send({
               success:false,
                message:'wrong email or answer'
            })
        }

         // Password Hashing
        const hashed = await hashPassword(newpassword)
        
      // Updating the Password in the Database
        await userModel.findByIdAndUpdate(user._id,{password:hashed});

        // Sending Success Response
        res.status(200).send({
            success:true,
            message:'password reset successfully',
        })

        
    } catch (error) {
          // Handle any unexpected errors
          console.error('Error resetting password:', error);
        res.status(500).send({
            success:false,
            message:'something went wrong in forgot password in backend',
            error
        })
        
    }
  
}





// test controller
export const testController = (req,res)=>{
    console.log('protected route')
    res.send('protected route')

}


//update profile 

export const updateProfilController = async(req,res) =>{
    try {
        const {name,email,address,phone,password} = req.body;
        const user = await userModel.findById(req.user._id)
        //password
        if(password && password.length < 5){
            return res.json({error:'password is required and 5 charcters long'})
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
         const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
            name:name || user.name,
            password:hashedPassword || user.password,
            phone:phone || user.phone,
            address:address ||user.address
        },{new:true})
        res.status(200).send({
            success:true,
            message:'profile updated successfully',
            updatedUser
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:'error while updating profile',
            error: error.message, 
        })
        
    }

}


// orders controller
export const getOrderController = async(req,res)=>{
    try {
       
        const orders = await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");
      
        console.log(req.user._id);
        res.json(orders);
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting orders',
            error
        })
        
    }
}


// all orders controller for admin
export const getAllOrderController = async(req,res)=>{
    try {
        const orders = await orderModel
        .find({})
        .populate("products","-photo")
        .populate("buyer","name")
        .sort({createdAt : -1});
      
        console.log(req.user._id);
        res.json(orders);
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting all orders',
            error
        })
        
    }
}

//order status controller
export const orderStatusController = async(req, res) =>{
    try {
        const { orderId} = req.params
        const { status} = req.body

        const orders = await orderModel.findByIdAndUpdate(orderId,{status}, {new:true})
        res.json(orders)

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while updating order status',
            error
        })
        
    }
}