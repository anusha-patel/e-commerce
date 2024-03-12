import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';



const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');


    const navigate = useNavigate();


    //form submit function

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email,answer,newpassword);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {email,newpassword,answer});
            if (res && res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('went wrong in handlesubmit function')

        }
        // toast.success('login successfully completed')
    }

    return (
        <Layout title='reset password'>
            <div className='register'>
                <h1>Reset password</h1>
                <form onSubmit={handleSubmit}>

                    {/* email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='enter your email'
                            className="form-control" id="exampleInputEmail"
                            required />
                    </div>

                    {/* answer */}
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder='enter your favoirte singer'
                            className="form-control" id="exampleInputAnswer"
                            required />
                    </div>

                    {/* new password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newpassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='enter new password'
                            className="form-control" id="exampleInputPassword" required />
                    </div>



                    <button 
                        type="submit"
                        className="btn btn-primary " >
                        RESET Password
                    </button>



                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword