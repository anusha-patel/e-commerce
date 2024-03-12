import React,{useState} from 'react'
import Layout from '../../components/Layouts/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] =useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[phone,setPhone] = useState('');
  const[address,setAddress] = useState('');
  const[answer, setAnswer] = useState('');
  const navigate = useNavigate();

  //form submit function

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(name,email,address,phone,password,answer);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer});
      console.log(res)
      if(res && res.data.success){
        toast.success(res.data.message)
        navigate('/login')
      }else{
        toast.error(res.data.message)
      }      
    } catch (error) {
      console.log(error);
      toast.error('went wrong in handlesubmit function')
      
    }
   
  }

  return (
    <Layout title='register'>
        <div className='register'>
            <h1>Register</h1>
   <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input 
    type="text" 
    value={name}
    onChange={(e)=>setName(e.target.value)}
    placeholder='enter your Name'
    className="form-control" id="exampleInputName" 
    required />
  </div>

  <div className="mb-3">
    <input 
    type="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    placeholder='enter your email' 
    className="form-control" id="exampleInputEmail"
    required  />
  </div>
  
  <div className="mb-3">
    <input 
    type="password" 
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    placeholder='enter your password'
    className="form-control" id="exampleInputPassword1"required  />
  </div>

  <div className="mb-3">
    <input 
    type="tel" 
    value={phone}
    onChange={(e)=>setPhone(e.target.value)}
    placeholder='enter your phone no'
    className="form-control" id="exampleInputAddress" 
    required  />
  </div>


  <div className="mb-3">
    <input 
    type="text" 
    value={address}
    onChange={(e)=>setAddress(e.target.value)}
    placeholder='enter your address'
    className="form-control" id="exampleInputAddress" 
    required  />
  </div>


  <div className="mb-3">
    <input 
    type="text" 
    value={answer}
    onChange={(e)=>setAnswer(e.target.value)}
    placeholder='your favorite singer'
    className="form-control" id="exampleInputAnswer" 
    required  />
  </div>


  <button type="submit" className="btn btn-primary">Submit</button>
 
</form>

        </div>
    </Layout>
  )
}

export default Register