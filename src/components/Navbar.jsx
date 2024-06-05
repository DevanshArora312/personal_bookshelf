import React from 'react'
import { Link } from 'react-router-dom'
import logo2 from "../assets/logo2.png"
const Navbar = () => {
  return (
    <div className='w-full h-16 p-2 bg-[rgb(15,137,103)]/95 flex items-center justify-between'>
        <Link to={'/'} className='h-full flex items-center'>
            <img src={logo2} className='h-full w-30' />
        </Link>
        <div className='h-full flex items-center justify-around gap-x-10 text-white font-semibold max-sm:gap-x-2'>
            <Link to='/search' className='active:scale-75 transform duration-300 hover:bg-transparent/15 p-2'>Search</Link>
            <Link to={'/bookshelf'} className='active:scale-75 transform duration-300 hover:bg-transparent/15 p-2'>My Books</Link>
        </div>
    </div>
  )
}

export default Navbar