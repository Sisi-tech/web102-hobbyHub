import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./component/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";



function App() {
  

  return (
    <div className='w-full h-screen bg-gray-200'>
      <BrowserRouter>
        <div className='w-full flex justify-around items-center bg-emerald-400 p-2 text-white text-xl'>
          <h2 className='text-2xl'>HubbyHub</h2>
          <input type="text" placeholder='Search' className='rounded-full pl-2 p-1 w-[300px] border-solid shadow-md text-black' />
          <div className='flex justify-around items-center gap-10'>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
            <Link to="/edit">Edit Post</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/create" element={<CreatePost /> } />
          <Route path="/edit" element={<EditPost /> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
