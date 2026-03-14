import React, { useRef, useState } from 'react'
import usePost from '../hook/usePost'
import{useNavigate} from 'react-router-dom'
import '../style/createPost.scss'
const CreatePost = () => {
  const [caption, setcaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const postImageInputFeildRef = useRef(null);
  const { handleCreatePost } = usePost();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputFeildRef.current?.files?.[0];

    if (!file) {
      alert("Please select an image before creating a post.");
      return;
    }

    setIsSubmitting(true);

    try {
      await handleCreatePost(file, caption);
      navigate('/', { replace: true });
    }
    catch (error) {
      console.error("Error creating post:", error);
      const errorMessage = error?.response?.data?.message || "Failed to create post. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }

  }


  return (


    <main className="create-post-page">
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className="post-image-label" htmlFor="postImage">Select Image</label>
          <input ref={postImageInputFeildRef} hidden type="file" name='postImage' id='postImage' accept="image/*" />
          <input value={caption} onChange={(e) => setcaption(e.target.value)} type="text" name="caption" id="caption" placeholder="Enter Caption" />
          <button className="button primary-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create Post'}</button>
        </form>
      </div>


    </main>
  )
}

export default CreatePost
