import axios from 'axios'
import {useState, useEffect, useContext, createContext} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children})=>{

    const [auth, setAuth] = useState({
        user:null,
        token:''
    })
    
// default axios
axios.defaults.headers.common['Authorization']= auth?.token;
// console.log(axios.defaults.headers.common['Authorization']);

    useEffect(()=>{
        const data = localStorage.getItem('auth');
        // console.log(data);
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token
            })
        }
        //eslist-disable-next-line
    },[]);
     return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
     )
}

//custom hook

const useAuth =()=> useContext(AuthContext)

export{ useAuth, AuthProvider}

