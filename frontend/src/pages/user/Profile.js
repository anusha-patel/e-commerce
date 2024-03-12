import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layouts/Layout";
import UserMenu from "../../components/Layouts/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  //CONTEXT
  const [auth, setAuth] = useAuth();

  //STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  //get user data
  useEffect(()=>{
    const{email,name,address,phone} = auth?.user
     setName(name)
     setPhone(phone)
     setAddress(address)
     setEmail(email)
     
  },[auth?.user])
  console.log(name, email, address, phone, password);


  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, address, phone, password);
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if(data?.error){
        toast.error(data?.error)
      }else{
        console.log(data)
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('profile updated')
      }
      // 9:31:58 
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("went wrong in handlesubmit function");
    }
  };
  return (
    <Layout title={"your profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="register">
              <h1>User profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="enter your Name"
                    className="form-control"
                    id="exampleInputName"
                   
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email"
                    className="form-control"
                    id="exampleInputEmail"
                    
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="enter your password"
                    className="form-control"
                    id="exampleInputPassword1"
                   
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="enter your phone no"
                    className="form-control"
                    id="exampleInputAddress"
                   
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="enter your address"
                    className="form-control"
                    id="exampleInputAddress"
                   
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
