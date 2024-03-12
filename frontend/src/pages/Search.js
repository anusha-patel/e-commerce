import React from 'react'
import Layout from '../components/Layouts/Layout';
import { useSearch } from '../context/search';


const Search = () => {
    const [values,setValues] = useSearch()
    console.log(values)
  return (
    <Layout title={'search result'}>
        <div className='container'>
            <div className='text-center'> 
            <h1>search result</h1>
            <h6>{values?.result?.length
             < 1 ? 'no product found' : `found ${values?.result?.length
             }` }</h6>

<div className="d-flex flex-wrap">
            {values.result?.map((p) => (
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
                    <button className="btn btn-primary ms-1">More Details</button>
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

export default Search