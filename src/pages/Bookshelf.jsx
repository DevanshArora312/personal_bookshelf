import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import homebg from "../assets/homebg.jpg"
import BookCard from '../components/BookCard'
const Bookshelf = () => {
    const [books,setBooks] = useState(JSON.parse(localStorage.bookmarks))
    const [multi,setMulti] = useState(false)
    const [selected,setSelected] = useState([])
    // console.log(selected)
  return (
    <div className='w-full h-full'>
        <Navbar/>
        <div className='w-full h-full'>
            <div className='w-full p-4 h-auto text-white text-[50px] flex justify-center items-center' style={{
                backgroundImage: `url(${homebg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.9)',
                // objectFit:"cover",
                backgroundPosition:"center"
                }}>
                My Bookshelf!
            </div>
            {
                !multi ? 
                <div className='w-full flex justify-end items-center p-4'>
                    <button onClick={()=>setMulti(true)} className='p-2 bg-blue-500 text-white'>
                        Delete Multiple
                    </button>
                </div>
                : 
                <div className='w-full flex justify-end items-center p-4'>
                    <div className='flex gap-x-5'>
                        <button 
                            className='p-2 bg-blue-500 text-white'
                            onClick={()=>{
                                setMulti(false)
                                setSelected([])
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            className='p-2 bg-blue-500 text-white'
                            onClick={()=>{
                                setMulti(false)
                                var tmp = books;
                                selected.forEach(e => {
                                    const ind = tmp.findIndex(b => b.title === e);
                                    tmp.splice(ind,1);
                                })
                                setBooks(tmp);
                                window.localStorage.setItem("bookmarks",JSON.stringify(tmp));
                                setSelected([])
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            }
            <div className='w-full p-4 scroll-auto grid max-sm:grid-cols-1 grid-cols-2 min-[1150px]:grid-cols-3 justify-items-center gap-y-5 '>
                {
                    !multi ? 
                    books && books.map((book,ind) => {
                        return(
                            <BookCard
                                key={ind} 
                                title={book.title}
                                img={book.img}
                                author={book.author}
                                rating={book.rating}
                                pages={book.pages}
                                // id = {book.key.replace('/works/','')}
                            />
                        )
                    })
                    :
                    books && books.map((book,ind) => {
                        return(
                            <BookCard
                                key={ind} 
                                title={book.title}
                                img={book.img}
                                author={book.author}
                                rating={book.rating}
                                pages={book.pages}
                                multi={multi}
                                selected={selected}
                                setSelected={setSelected}
                            />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Bookshelf