import React from 'react'
import Navbar from '../components/Navbar';
import homebg from "../assets/homebg.jpg"
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='w-full h-full'>
        <Navbar/>
        <div className='w-full h-[450px] flex justify-center items-center text-white text-[50px] max-md:text-[35px] max-sm:text-[25px]' 
             style={{
                backgroundImage: `url(${homebg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.9)',
                // objectFit:"cover",
                backgroundPosition:"center"
            }}
        >
            <h1 className='text-center'>Welcome to your Personal Bookshelf!</h1>
        </div>
        <div className='w-full md:flex-row flex flex-col items-center justify-between p-10 max-md:text-[20px] text-[25px] font-semibold'>
            <div className='max-md:w-[90%] w-[30%] h-[100px] flex flex-col items-center justify-center'>
                <p className='text-center'>Got a book you're curious about?</p>
                <p><Link to={'/search'} className='text-red-400 capitalize hover:underline font-bold'>Search</Link> away!!</p>
            </div>
            <div className='max-md:w-[90%] w-[30%] h-[100px] flex flex-col items-center justify-center font-bold relative gap-y-2'>
                <div className='w-full h-[3px] rounded-lg  bg-blue-900' />
                OR
                <div className='w-full h-[3px] rounded-lg  bg-blue-900' />
            </div>
            <div className='max-md:w-[90%] w-[30%] h-[100px] flex flex-col items-center justify-center'>
                <p className='text-center'>Want to keep track of your books?</p>
                <p className='text-center'>Use our <Link to={'/bookshelf'} className='text-blue-400 capitalize hover:underline font-bold'>bookshelf</Link> feature today!!</p>
            </div>
        </div>
    </div>
  )
}

export default Home