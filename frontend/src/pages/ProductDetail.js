import React , {useState, useEffect} from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
    const {pid} = useParams();
    const[product, setProduct] = useState({});
    const[relatedProducts, setRelatedProducts] = useState([])
    const navigate = useNavigate()
    // console.log(relatedProducts)
//initial load
// useEffect(() =>{
//     if(params?.slug) getProduct()
// },[params?.slug])

useEffect(() =>{
    if(pid) getProduct()
},[pid])

//GET Product
const getProduct = async() =>{
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${pid}`)  //${params.slug
        console.log(data)
        setProduct(data?.product)
        getSimilarProduct(data?.product?._id, data?.product?.category?._id)
        console.log(data?.product?._id)
        console.log(data?.product?.category?._id)
        
    } catch (error) {
        console.log(error)
        
    }

}

// get similar product
const getSimilarProduct = async(pid,cid) =>{
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
        console.log(data)
        setRelatedProducts(data?.products)
        console.log(data?.products);
        
    } catch (error) {
        console.log(error)
        
    }
}

  return (
     <Layout>
        {/* {JSON.stringify(product, null, 4)} */}
 <div className='container mt-3'>
        <div className='row '>
            <div className='col-md-4 col-sm-10  border-sm-none  border border-secondary p-3 mb-3'>
            <img   src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top productDetails-img img-fluid" alt={product.name} />
            </div>
            <div className='col-md-4 col-sm-10 mb-3 text-center text-md-start'>
                 <h1 className=' mb-3'> product Details</h1>
                 <h6> Name: {product.name}</h6>
                 {/* <h6> id: {product._id}</h6> */}
                  <h6> description: {product.description}</h6>
                  <h6> price: {product.price}</h6>
                  {/* <h6> category: {product.category.name}</h6> */}
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                
                 
            </div>
        </div>
        <div className='row container'>
            {/* <h2>{JSON.stringify(relatedProducts, null, 4)}</h2> */}
            <h3 className='mt-3'>similar products</h3>
            {relatedProducts.length < 1 && (<p className='text-center'> no similar products found</p>)}

            <div className="d-flex flex-wrap mx-5">
            {relatedProducts?.map((p) => (
                <div className="card m-4" style={{ width: "18rem" }}>
                  <img
                    width={20}
                    height={300}
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text">${p.price}</p>
                    {/* <p className="card-text">${p._id}</p> */}
                    <button className="btn btn-primary ms-1"
                     onClick={()=> navigate(`/product/${p._id}`)}>More Details</button>
                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                  </div>
                </div> 
            ))}
          </div>

        </div>
        </div>
     </Layout>
  )
}

export default ProductDetail