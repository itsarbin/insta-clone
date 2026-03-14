import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/post.jsx'
import usePost from '../hook/usePost';
import Nav from '../../../shared/components/Nav.jsx';

const Feed = () => {

    const {loading, feed, handleGetFeed} = usePost()

    useEffect(()=>{
        handleGetFeed()
            .catch((error) => {
                console.error("Failed to load feed:", error)
            })
    },[])
    
    return (
        <main className="feed-page">
            <Nav />
            <div className="feed">
                <div className="posts">
                  {loading ? (
                    <h1>Feed is loading...</h1>
                  ) : feed?.length ? feed.map((item, index) => (
                    <Post key={item?._id || index} post={item} />
                  )) : <h2>No posts found.</h2>}
                </div>
            </div>
        </main>
    )
}

export default Feed
