import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import homebg from "../assets/homebg.jpg"
import BookCard from '../components/BookCard'
import { RxCross1 } from "react-icons/rx";
import { VscSearch } from "react-icons/vsc";
const Bookshelf = () => {
    const bookmarks = JSON.parse(localStorage.bookmarks)
    const [books,setBooks] = useState(bookmarks)
    const [search,setSearch] = useState("");
    const [multi,setMulti] = useState(false)
    const [selected,setSelected] = useState([])
    // console.log(selected)
    useEffect(()=>{
        if(search.trim() == "") {
            setBooks(bookmarks);
            return;
        }
        const newBooks = books.filter(book => book.title.toLowerCase().includes(search));
        // setBooks(newBooks)
    },[search])
    console.log(search)
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
            <div className='w-full h-14 flex justify-center items-center '>
                <div className='w-[80%] flex items-center justify-between h-10 rounded-xl border-black/30 border-[2px] bg-white/70 pr-2' >
                    <div className='w-[95%] flex gap-x-2 items-center h-full'>
                        <VscSearch className='bg-gray-400 h-full py-2 rounded-l-lg w-[7%] max-sm:w-[10%] max-sm:px-[4px]'/>
                        <input 
                            className='focus:outline-none w-[90%]'
                            placeholder='Search a book'  
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <RxCross1 className='' onClick={()=>{setSearch("")}} />
                </div>
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