import "../styles/nav.scss"
import {useNavigate} from "react-router-dom"

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className='nav'>
        <p className='brand-text'>Insta</p>
        <button className='button primary-button' onClick={() => navigate('/create-post')}>
          New Post
        </button>
    </nav>
  )
}

export default Nav
