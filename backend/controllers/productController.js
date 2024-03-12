import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js"
import fs from 'fs';
import slugify from 'slugify';
import braintree from 'braintree';
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv"


dotenv.config();

// payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey:  process.env.BRAINTREE_PUBLIC_KEY,
    privateKey:  process.env.BRAINTREE_PRIVATE_KEY,
  });

//create product
export const createProductController = async(req,res)=>{
    try {
        // req.fields means now we are not getting values from body/users, we are getting from fields of product schema/,modle
        const {name,slug,description,price,category,quantity,shipping} =  req.fields
        const {photo} = req.files

        // validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !price:
                return res.status(500).send({error:'price is required'})
            case !description:
                return res.status(500).send({error:'description is required'})
            case !category:
                return res.status(500).send({error:'category is required'})
            case !quantity:
                return res.status(500).send({error:'quantity is required'})
            case !photo && photo.size > 1000000:
                return res.status(500).send({error:'photo is required and less than 1mb'})

        }
       const products = new productModel({ ...req.fields,slug:slugify(name) })

       if(photo){
        products.photo.data = fs.readFileSync(photo.path)
        products.photo.contentType = photo.type
       }
       await products.save()
       res.status(201).send({
        success:true,
        message:'product created successfully',
        products,
       });
       
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success: false,
            error,
            message:'error in creating product'
        })
        
    }

}

//get all product
export const getProductController = async(req,res) =>{
    try {

        const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1})
        res.status(200).send({
            success:true,
            totalCount:products.length,
            message:'all products',
            products,
           
        })
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'error in getting all products',
            error:error.message
        })
        
    }
}

// get single product
export const getSingleProduct = async(req,res)=>{
    try {
        const product = await productModel
        .findById(req.params.pid)
        // .findOne({slug:req.params.slug})
        .select("-photo")
        .populate("category")

        res.status(200).send({
            success:true,
                message:'single product ',
                product
          })
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'error in getting one products',
            error:error.message
        })
    }

}


//get photo

export const productPhotoController =async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo")

        if(product.photo.data){
            res.set('content-type', product.photo.contentType)
            return res.status(200).send(
                
                product.photo.data
            )
        }
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'error in getting photo of product',
            error:error.message
        })
        
    }
}

// delete product not tested in postman
export const productDeleteController = async(req,res) =>{
    try {
        
       await productModel.findByIdAndDelete(req.params.pid).select('-photo')

        res.status(200).send({
            success:true,
            message:'product is deleted successfully'
        })
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'error in deleting product',
            error:error.message
        })
        
    }

}


export const updateProductController = async(req,res)=>{
    try {
        // req.fields means now we are not getting values from body/users, we are getting from fields of product schema/,modle
        const {name,slug,description,price,category,quantity,shipping} =  req.fields
        const {photo} = req.files

        // validation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !price:
                return res.status(500).send({error:'price is required'})
            case !description:
                return res.status(500).send({error:'description is required'})
            case !category:
                return res.status(500).send({error:'category is required'})
            case !quantity:
                return res.status(500).send({error:'quantity is required'})
            case !photo || photo.size > 1000000:
                return res.status(500).send({error:'photo is required and less than 1mb'})

        }
       const products = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug:slugify(name)}, {new:true})

       if(photo){
        products.photo.data = fs.readFileSync(photo.path)
        products.photo.contentType = photo.type
       }
       await products.save()
       res.status(201).send({
        success:true,
        message:'product updated successfully',
        products,
       });
       


        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'error in updating product',
            error:error.message
        })
        
    }
}


// filter products
export const productFilterController = async(req,res) => {
    try {
        const {checked,radio} = req.body
        // Destructuring the 'req.body' object to extract 'checked' and 'radio' properties.
        
        let args = {}
        // Initializing an empty object 'args' which will be used to construct the query parameters.

        if(checked.length >0) args.category = checked;
        // If there are selected 'checked' values (presumably checkboxes), assign them to the 'category' property in the 'args' object.

        if(radio.length)args.price={$gte:radio[0], $lte:radio[1]}
        // If there are selected 'radio' values (presumably a price range), create a 'price' property in the 'args' object with '$gte' (greater than or equal) and '$lte' (less than or equal) conditions.
        
        const products = await productModel.find(args)
        
        // Use the 'productModel.find()' method to query the database with the constructed 'args' object. This likely fetches products based on the specified criteria.
        res.status(200).send({
            success:true,
            products
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
           success:false,
           message:'error while filtering products',
           error 
        })
        
    }
}


// product count or pagenation
export const productCountController = async(req,res)=>{
    try {
        const  total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success:true,
            total
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
           success:false,
           message:'error while products loading',
           error 
        })
        
    }
}

//products per page
export const productListController = async(req,res)=>{
    try {
        const perPage = 4;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select('-photo')
            .skip((page -1)* perPage)
            .limit(perPage)
            .sort({createdAt :-1})
            res.status(200).send({
                success:true,
                products,
            });
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
           success:false,
           message:'error while per page',
           error 
        })
        
    }

}

//search product
export const searchProductController = async(req,res) =>{
    try {
        // Extract the 'keyword' parameter from the request parameters
        const {keyword} = req.params
        // Perform a MongoDB query using the 'find' method on the 'productModel' collection
      // Look for documents where either the 'name' or 'description' field matches the specified regular expression
    // The regular expression is constructed from the 'keyword' parameter, and it's case-insensitive ('i' option)
//     Regex ($regex): It's a pattern that describes a set of strings. In this context, it's used for pattern matching in the database query.

// Options ($options): These are additional settings for the regular expression. In this case, "i" is used for case-insensitive matching. Other options might include "m" for multiline matching or "s" for treating the input string as a single line.
        const result = await productModel.find({
            $or:[
               {name:{$regex : keyword, $options:"i"}},
               {description:{$regex : keyword, $options:"i"}},
            ],   
        })
        // Exclude the 'photo' field from the returned documents
        .select("-photo")
         // Respond to the client with a JSON object containing the result
        res.json(result);

        
    } catch (error) {
        console.log(error)
        res.status(400).send({
           success:false,
           message:'error in search',
           error 
        })
        
    }
}


// releated or similar products

export const releatedProductController = async(req,res) =>{
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}//ne = not incuded
        }).select('-photo').limit(3).populate("category") // populate = on which base heare category base

        res.status(200).send({
            success:true,
            products
        })

        
    } catch (error) {
        console.log(error)
        res.status(400).send({
           success:false,
           message:'error in similar products',
           error 
        })
        
    }
}


//get product by category
export const productCategoryController = async( req, res) =>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug});
        const products = await productModel.find({category}).populate("category")
        res.status(200).send({
            success:true,
            category,
            products
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).send({
           success:false,
           message:'error in getting products by category',
           error 
        })
        
        
    }

}


// payment controller 
// token

export const braintreeTokenController = async(req,res) =>{
    try {
        gateway.clientToken.generate({}, function(err, response){
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(response);
            }
        } )
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:'error in braintree payment token generation',
            error
        })
        
    }

}


// payment controller
export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
    let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            // console.log(req.user);
            res.json({ ok: true });
           
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };