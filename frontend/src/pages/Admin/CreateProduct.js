import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layouts/Layout';
import AdminMenu from '../../components/Layouts/AdminMenu';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {Select} from 'antd';
const{Option} =Select;
// 6:18:34

const CreateProduct = () => {
  const navigate = useNavigate()
  const[categories, setCategories] = useState([]);
  const[category, setCategory] = useState([]);
  const[photo, setPhoto] = useState('')
  const[name, setName] = useState('')
  const[price, setPrice] = useState('')
  const[description, setDescription] = useState('')
  const[quantity, setQuantity] = useState('')
  const[shipping, setShipping] = useState('')


  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting all category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async(e)=>{
    e.preventDefault()
    try {
      const productData = new FormData()
      productData.append('name',name)
      productData.append('description',description)
      productData.append('price',price)
      productData.append('quantity',quantity)
      productData.append('photo',photo)
      productData.append('category',category)
   
      const {data} =  await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`, productData
      )
      if(data?.success){
        toast.success('product created successfully')
        navigate('/dashboard/admin/products')
      }
      else{
        toast.error(data?.message)
      }

      
    } catch (error) {
      console.log(error)
      toast.error('went wrong in create product')
      
    }

  }

  return (
   <Layout title={'dashboard-create product'}>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>

            <div className='col-md-9'>
               CreateProduct
               <div className='m-1 w-75'>

                {/* select option div */}
                <Select bordered={false} placeholder='select category' 
                size='Large' showSearch className='form-select mb-3'
                onChange={(value) => {setCategory(value)}}>
                  {categories?.map(c =>(
                    <Option key={c._id} value={c._id} >{c.name}</Option>
                  ))}

                </Select>

                {/*  photo div*/}
                <div className='mb-3'>
                  <label className='btn btn-outline-secondary col-md-12'>
                    {photo ? photo.name : 'upload photo'}
                    <input type='file' name='' accept='images/*'//= any form can be accepeted png, jpg etc
                     onChange={(e) => setPhoto(e.target.files[0])}
                     hidden/>
                  </label>
                </div>
                {/* photo preview div */}
                <div className='mb-3'>
                  {photo && (
                    <div className='text-center'>
                      <img src={URL.createObjectURL(photo)} alt='product photo' height={'200px'} className='img img-responsive'/>
                    </div>
                  )}

                </div>
                {/* name div */}
                <div className='mb-3'>
                  <input type='text'
                  placeholder='write a name'
                  className='form-control'
                  onChange={(e)=> setName(e.target.value)}/>
                </div>

                {/* description div */}
                <div className='mb-3'>
                  <input type='textarea'
                  placeholder='write a description'
                  className='form-control'
                  onChange={(e)=> setDescription(e.target.value)}/>
                </div>

               {/* price div */}
                <div className='mb-3'>
                  <input type='number'
                  placeholder='write a price'
                  className='form-control'
                  onChange={(e)=> setPrice(e.target.value)}/>
                </div>

               {/* quantity div */}
                <div className='mb-3'>
                  <input type='number'
                  placeholder='write a quantity'
                  className='form-control'
                  onChange={(e)=> setQuantity(e.target.value)}/>
                </div>

                {/* shipping div */}
                <div className='mb-3'>
                 <Select
                 bordered={false}
                 placeholder='select shipping'
                 size='large'
                 showSearch
                 className='form-select mb-3'
                 onChange={(value) => {
                  setShipping(value)
                 }}>
                  <Option value='0'>NO</Option>
                  <Option value='1'>YES</Option>

                 </Select>
                </div>
                <div className='mb-3 w-75 mx-auto '>
                  <button className='btn btn-primary ' onClick={handleCreate}>create product</button>

                </div>


               </div>

            </div>

        </div>
        </div>
   </Layout>
  )
}

export default CreateProduct