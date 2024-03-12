import {useState, useContext,useEffect, createContext} from 'react';

// Create a new React context
const CartContext = createContext()

// Define a provider component to wrap your application and manage the state
const CartProvider = ({children})=>{
    
     // State to manage the cart-related information
    const [cart, setCart] = useState([])


    // TO get local storage cart items data
    useEffect(()=>{
        let existingCartItem = localStorage.getItem('cart')
        if(existingCartItem) setCart(JSON.parse(existingCartItem));

    },[])
    
    // Provide the state and the state updater function to the components using this context
     return(
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
     )
}

//custom hook

// Custom hook for accessing the cart context values
const useCart =()=> useContext(CartContext )

// Export the custom hook and the provider component
export{ useCart, CartProvider}

