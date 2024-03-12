import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'

const Users = () => {
  return (
    <Layout title={'dashboard- all users'}>
         <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>

            <div className='col-md-9'>
                users
            </div>

        </div>
        </div>
    </Layout>
  )
}

export default Users