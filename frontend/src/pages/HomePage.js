import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { Prices } from "../components/Prices";
import { useCart } from "../context/Cart";


const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const[cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const[checked, setChecked] = useState([])
  const[radio, setRadio] = useState([])
  const [total, setTotal ]= useState(0)
  const [page, setPage]= useState(1);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

 

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
    getTotal()
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
        // `https://e-commerce-ten-theta-83.vercel.app/api/v1/product/product-list/${page}`
      );
      // 7:39:26
      setLoading(false)
      console.log(data.products)
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("went wrong in getting all products");
    }
  };

   //get total count
   const getTotal = async()=>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(data?.total)
      
    } catch (error) { 
      console.log(error)
      
    }
  }

  useEffect(()=>{
    if(page===1) return
    loadmore()
  },[page])

  // load more
  const loadmore = async() =>{
    try {
      setLoading(true)
      const {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false)
      setProducts([...products, ...data?.products])
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }


  // filter by category
  const handleFilter = (value, id)=>{
    let all = [...checked]; // Using spread operator to create a new array
    if(value){
      all.push(id); // If the checkbox is checked, add the category id to the array
    }else{
      all = all.filter((c)=> c!==id); // If the checkbox is unchecked, remove the category id from the array
    }
    setChecked(all) // Update the state with the new array

  }

  //calling above function once page refreshed
  useEffect(() => {
   if(!checked.length || !radio.length )  getAllProducts();
  }, [checked.length, radio.length]);

//based on checked and radio 
  useEffect(() => {
    if(checked.length || radio.length )  filterProduct();
   }, [checked, radio]);

  //get filter product

  const filterProduct = async () =>{
    try {
      const{data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`,{checked,radio})
      setProducts(data?.products)
      
    } catch (error) {
      console.log(error)
      
    }
  }

  return (
    // 7:03:15 
    <Layout title={"All products - best offers"}>
      <div className="row mt-3 ms-3">
        <div className="col-md-2 ">

          {/* filter by category */}
          <h3 className="text-center"> filter by category</h3>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>

         {/* filter by price */}
          <h3 className="text-center mt-4"> filter by price</h3>
          <div className="d-flex flex-column">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p =>(
                <div key={p._id}>
                    <Radio value={p.array}> {p.name} </Radio>
                </div>
              ))}

            </Radio.Group>
          </div>

          <div className="d-flex flex-column mt-4">
            <button className="btn btn-danger"
              onClick={()=> window.location.reload()}
            > Reset Filters

            </button>

          </div>

        </div>
        <div className="col-md-10">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center"> all products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
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
                    <button className="btn btn-secondary ms-1"
                    onClick={()=>{ 
                      setCart([...cart,p])
                      // to save cart items in local storage
                      localStorage.setItem('cart', JSON.stringify([...cart,p]))
                      toast.success('item added to cart')
                    }}

                    >Add to Cart</button>
                  </div>
                </div> 
            ))}
          </div>
        
        <div className="m-2 p-3 d-flex justify-content-center align-items-center">
        {/* 7:42:39 */}
          {products && products.length < total && (
              <button className="btn btn-warning"
               onClick={(e) => {
                e.preventDefault()
                setPage(page +1);
               }}>
                {loading? ' Loading ....' : "Loadmore"}
              </button>
          )}
          
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
