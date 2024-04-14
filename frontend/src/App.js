// import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import './App.css'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element ={<HomePage/>}/>
      <Route path='/product/:pid' element ={<ProductDetail/>}/>
      <Route path='/categories' element ={<Categories/>}/>
      <Route path='/cart' element ={<CartPage/>}/>
      <Route path='/category/:slug' element ={<CategoryProduct/>}/>
      <Route path='/search' element ={<Search/>}/>
      {/* private dashboard for user */}
      <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
      </Route>
       {/* private dashboard for admin */}
      <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:pid" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
      </Route>
     
      <Route path='/register' element ={<Register/>}/>
      <Route path='/forgot-password' element ={<ForgotPassword/>}/>
      <Route path='/login' element ={< Login/>}/>
      <Route path='/about' element ={<AboutPage/>}/>
      <Route path='/contact' element ={<ContactPage/>}/>
      <Route path='/policy' element ={<Policy/>}/>
      <Route path='*' element ={<PageNotFound/>}/>
    </Routes>
    </>
  
  );
}

export default App;
