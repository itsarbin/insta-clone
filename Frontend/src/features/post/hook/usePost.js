import { useContext } from "react";
import { PostContext } from "../post.context";
import {getFeed} from "../services/post.api";

const usePost = ()=>{
    const context = useContext(PostContext);
    const {post, setPost, loading, setloading, feed, setfeed, error, setError} = context;

    const handleGetFeed = async () => {
        setloading(true);
        setError('');
        try {
            const data = await getFeed();
            setfeed(data);
            return data;
        } catch (error) {
            console.error("Error fetching feed:", error);
            setfeed([]);
            setError(error?.response?.data?.message || 'Failed to load posts.');
            throw error;
        } finally {
            setloading(false);
        }
    }

    return {
        post,
        loading,
        feed,
        error,
        handleGetFeed,
    }
}

export default usePost;
