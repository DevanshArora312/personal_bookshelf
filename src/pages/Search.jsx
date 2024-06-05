import React from 'react'
import { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import { RxCross1 } from "react-icons/rx";
import { VscSearch } from "react-icons/vsc";
import BookCard from '../components/BookCard';
const Search = () => {
    const [search,setSearch] = useState("");
    const [books,setBooks] = useState(null);
    useEffect(()=>{
        if(search.trim() == '') return;
        const query = search.replace(" ","+")
        fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
        .then(res => {
            return res.json();
        })
        .then(data =>{
            setBooks(data.docs);
        })
    },[search]);
    // console.log(books)
    // apis ---
    // books - https://openlibrary.org/search.json?q=harry&limit=10&page=1
    // images - https://covers.openlibrary.org/b/id/10523466-M.jpg
  return (
    <div className='w-full h-screen'>
        <Navbar/>
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
            books ? 
            <div className='mt-5 w-full grid max-sm:grid-cols-1 grid-cols-2 min-[1150px]:grid-cols-3 justify-items-center gap-y-5 h-full scroll-auto'>
            {
                books.map((book,ind) =>{
                    return(
                        <BookCard
                            key={ind} 
                            title={book.title}
                            img={book.cover_i}
                            author={book.author_name[0]}
                            rating={Math.round(book.ratings_average * 100) / 100}
                            pages={book.number_of_pages_median}
                            // id = {book.key.replace('/works/','')}
                        />
                    )
                })
            }
            </div>
            :
            <div className='text-[40px] flex w-full h-[calc(100%-7.5rem)] justify-center items-center'>
                Search for books to appear!
            </div>    
        }
    </div>
  )
}

export default Search