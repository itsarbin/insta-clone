import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/posts",
    withCredentials:true


})

export async function getFeed(){
        try {
            const response = await api.get('/');
            return Array.isArray(response.data?.posts) ? response.data.posts : [];
        } catch(err) {
            console.error("Error fetching feed:", err);
            throw err;
        }
}
