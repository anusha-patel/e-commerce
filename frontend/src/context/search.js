import {useState, useContext, createContext} from 'react';

// Create a new React context
const SearchContext = createContext()

// Define a provider component to wrap your application and manage the state
const SearchProvider = ({children})=>{
    
     // State to manage the search-related information
    const [auth, setAuth] = useState({
        keyword:"",
        result:[],
    })
    
    // Provide the state and the state updater function to the components using this context
     return(
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
     )
}

//custom hook

// Custom hook for accessing the search context values
const useSearch =()=> useContext(SearchContext)

// Export the custom hook and the provider component
export{ useSearch, SearchProvider}

