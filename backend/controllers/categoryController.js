import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"



//create category controller
export const createCategoryController = async(req,res)=>{
    try {
        const  {name} = req.body
        if(!name){
            return res.status(401).send({
                message:'name is required'
            })
        }

        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            res.status(201).send({
                success:true,
                message:'category already exisits'
            })

        }

        const category = await new categoryModel({name, slug: slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new category created',
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in create category'
        })
        
    }

}

//update category 
export const updateCategoryController = async(req,res)=>{
    try {
        const {name } = req.body
        const { id} = req.params
        const  category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true})
        res.status(200).send({
            success:true,
            message:'updated the category name',
            category
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in update category'
        })
        
    }

}


// get all category

export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'all category list',
            category
        })

        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in get all category'
        })
        
    }

}

//single category 

export const singleCategoryController = async(req,res) =>{
    try {   
      const category = await categoryModel.findOne({slug:req.params.slug});
      res.status(200).send({
        success:true,
            message:'single category list',
            category

      })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in get single category'
        })
        
    }

}

// delete category
export const deleteCategoryController =async(req,res)=>{
    try {
        const { id} = req.params;

        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            category,
            message:'successfully deleted'

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in deleting category'
        })
        
    }

}