import { useContext } from "react";
import { PostContext } from "../post.context";
import { createPost, getFeed,likePost,unlikePost } from "../services/post.api";

const usePost = ()=>{
    const context = useContext(PostContext);
    const {post, loading, setloading, feed, setfeed} = context;

    const handleGetFeed = async () => {
        setloading(true);
        try {
            const data = await getFeed();
            setfeed(data);
            console.log(data);
            return data;
            
        } catch (error) {
            console.error("Error fetching feed:", error);
            setfeed([]);
            throw error;
        } finally {
            setloading(false);
        }
    }

    const handleCreatePost = async (imageFile, caption) =>{
        setloading(true);
        try{
            const data = await createPost(imageFile, caption);
            setfeed(prev => [data.post, ...prev]);
            return data;
        }catch(error){
            console.error("Error creating post:", error);
           
            throw error;
        }finally{
            setloading(false);
        }
    }

    const handleLikePost = async (postId) => {
        const data = await likePost(postId);
        await handleGetFeed();
    }
    const handleUnlikePost = async (postId) => {
        const data = await unlikePost(postId);
        await handleGetFeed();
    }


    return {
        post,
        loading,
        feed,
        handleGetFeed,
        handleCreatePost,
        handleLikePost,
        handleUnlikePost
    }
}

export default usePost;
