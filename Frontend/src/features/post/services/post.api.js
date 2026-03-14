import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/posts",
    withCredentials:true


})

export async function getFeed(){
        try {
            const response = await api.get('/');
            console.log(response.data);
            return Array.isArray(response.data?.posts) ? response.data.posts : [];
        } catch(err) {
            console.error("Error fetching feed:", err);
            throw err;
        }
}

export async function createPost(imageFile, caption){
    try{
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('caption', caption);

        const response = await api.post('/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        
        return response.data

    }catch(err){
        console.error("Error creating post:", err);
        throw err;
    }
}

export async function likePost(postId){
    const response = await api.post(`/like/${postId}`);
    return response.data;
}

export async function unlikePost(postId){
    const response = await api.post(`/unlike/${postId}`);
    return response.data;
}
