import {createContext,useState} from 'react'

export const PostContext = createContext();

export const PostContextProvider = ({children})=>{
    const [loading, setloading] = useState(false)
    const [post, setPost] = useState(null);
    const [feed, setfeed] = useState([])
    const [error, setError] = useState('')

    return (
        <PostContext.Provider value={{loading, setloading, post, setPost, feed, setfeed, error, setError}}>
            {children}
        </PostContext.Provider>
    )   
    
    
}
