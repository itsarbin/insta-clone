import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/post.jsx'
import usePost from '../hook/usePost';

const Feed = () => {

    const {loading, feed, error, handleGetFeed} = usePost()

    useEffect(()=>{
        handleGetFeed()
            .catch((error) => {
                console.error("Failed to load feed:", error)
            })
    },[])
    console.log("Feed data:", feed)
    
    if(loading){
        return (<main><h1>Feed is loading...</h1></main>)
    }

    if(error){
        return (
            <main className="feed-page">
                <div className="feed">
                    <div className="posts">
                        <h2>{error}</h2>
                    </div>
                </div>
            </main>
        )
    }


    return (
        <main className="feed-page">
            <div className="feed">
                <div className="posts">
                  {feed?.length ? feed.map((item, index) => (
                    <Post key={item?._id || index} post={item} />
                  )) : <h2>No posts found.</h2>}
                </div>
            </div>
        </main>
    )
}

export default Feed
