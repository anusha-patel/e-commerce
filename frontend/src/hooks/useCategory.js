import {useState, useEffect} from 'react'
import axios from 'axios'


export default function useCategory(){
    const [category, setCategory] = useState([])

    //get category

    const getCategory = async () =>{
        try {
            const{data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            setCategory(data?.category)
            // console.log(data)
            // console.log(data?.category)
            // console.log(data?.category[0]?.name)
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getCategory();
    },[])

    return category;

}

// NOTES:
// 1. naming convnetion is compalsary for custom hooks so "use" before any hook file name like "useCategory.js"  
// 2. above custom hook can be anywhere simply imort and use it 
