import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './features/auth/pages/login.jsx';
import Register from './features/auth/pages/register.jsx';
import Feed from './features/post/pages/Feed.jsx';
import CreatePost from './features/post/pages/CreatePost.jsx';
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Feed />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path="/create-post" element={<CreatePost />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes

