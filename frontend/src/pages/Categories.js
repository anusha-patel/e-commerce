import React,{useState, useEffect} from 'react';
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layouts/Layout';
import{ Link} from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()
  return (
    <Layout title={'All categories'}>
        <div className='container mt-5'>
            <div className='row'>
                {categories && categories?.map((c)=>(
                        <div className='col-md-6 mt-2 mb-2 gx-1 gy-1' key={c._id}>
                        <Link to={`/category/${c.slug}` }className='btn btn-primary text-light '>
                            {c.name}
                            {/* 08:32:15 */}
    
                       </Link>
    
                        
                    </div>
                ))}
               

            </div>
        </div>
    </Layout>
  )
}

export default Categories