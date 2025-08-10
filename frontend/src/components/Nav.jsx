import {NavLink} from 'react-router-dom'
const Nav = () => {
  return (
    <nav className='flex justify-center items-center gap-x-5 p-10'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
    </nav>
  )
}

export default Nav