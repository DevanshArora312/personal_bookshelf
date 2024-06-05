import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Bookshelf from './pages/Bookshelf';
import Search from './pages/Search';
function App() {
  const localStorage = window.localStorage.getItem("bookmarks");
  if(!localStorage) window.localStorage.setItem("bookmarks",JSON.stringify([]));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/bookshelf' element={<Bookshelf/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
