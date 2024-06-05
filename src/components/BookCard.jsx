import React, { useEffect, useState } from 'react'
import { FaStar,FaBookmark,FaRegBookmark } from "react-icons/fa6";
import Loader from './Loader';
const BookCard = ({title,author,img,rating,pages,multi,selected,setSelected}) => {
    const [url,setUrl] = useState("");
    useEffect(()=>{
        fetch(`https://covers.openlibrary.org/b/id/${img}-M.jpg`)
        .then(res =>{
            // console.log(res)
            setUrl(res.url)
        })
        return ()=>{
            setUrl(null)
        }
    },[title]);
    useEffect(()=>{
        setStyled(false)
    },[])
    const [styled,setStyled] = useState(selected?.indexOf(title) !== -1);
    const [saved,setSaved] = useState(JSON.parse(window.localStorage.getItem("bookmarks")).findIndex(e => e.title === title));
    // console.log(author);
    if(!multi ){
        return (
            <div className='flex max-sm:w-[300px] w-[370px] h-[200px] border-[2px] p-2 gap-x-2 items-center justify-between ' >
                <img src={url} className='w-[120px] h-[180px]' alt={title}/>
                <div className='flex flex-col text-[15px] justify-around h-full'>
                    <p ><strong>Title: </strong>{title}</p>
                    <p><strong>Author: </strong>{author}</p>
                    <p className='flex items-center gap-x-1'><strong>Rating: </strong>{rating} <FaStar className='mb-[2px]'/></p>
                    <p><strong>Pages: </strong>{pages}</p>
                </div>
                <div className='h-full'>
                    {
                        saved !== -1 ? 
                        <FaBookmark 
                            onClick={() => {
                                var bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
                                const ind = bookmarks.findIndex(e => e.title === title);
                                // console.log(bookmarks)
                                bookmarks.splice(ind,1);
                                window.localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
                                setSaved(-1);
                            }} 
                            className='' 
                            /> : 
                        <FaRegBookmark 
                            className='' 
                            onClick={() => {
                                var bookmarks = JSON.parse(window.localStorage.getItem("bookmarks"));
                                bookmarks.push({title,author,img,rating,pages})
                                window.localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
                                setSaved(bookmarks.length -1);
                            }} 
                        />}
                </div>
            </div>
          )
    }
    else {  
        // console.log(title,styled)
        return (
            <div className={`flex max-sm:w-[300px] w-[370px] h-[200px] border-[2px] p-2 gap-x-2 items-center justify-between duration-300 cursor-pointer ${styled ? "scale-90 brightness-50 bg-white/25" : ''}`} 
                onClick={()=>{
                    var tmp = selected;
                    const ind = selected.indexOf(title);
                    if(ind === -1){
                        tmp.push(title);
                        setSelected(tmp);
                        setStyled(true);
                    } else{
                        tmp.splice(ind,1);
                        setSelected(tmp)
                        setStyled(false)
                    }
                }}
            >
                <img src={url} className='w-[120px] h-[180px]' alt={title}/>
                <div className='flex flex-col text-[15px] justify-around h-full'>
                    <p ><strong>Title: </strong>{title}</p>
                    <p><strong>Author: </strong>{author}</p>
                    <p className='flex items-center gap-x-1'><strong>Rating: </strong>{rating} <FaStar className='mb-[2px]'/></p>
                    <p><strong>Pages: </strong>{pages}</p>
                </div>
                <div className='h-full'>
                    {
                        saved !== -1 ? 
                        <FaBookmark/> : 
                        <FaRegBookmark/>
                    }
                </div>
            </div>
          )
        }
}

export default BookCard