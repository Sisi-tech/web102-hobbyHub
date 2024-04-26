import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ReadPost from "./pages/ReadPost";
import SinglePost from "./pages/SinglePost";

function App() {
  

  return (
    <div className='w-full h-min-screen bg-gray-200'>
      <BrowserRouter>
        <div className='w-full flex justify-around items-center bg-emerald-400 p-2 text-white text-xl'>
          <h2 className='text-2xl'>HubbyHub</h2>
          <input type="text" placeholder='Search' className='rounded-full pl-2 p-1 w-[300px] border-solid shadow-md text-black' />
          <div className='flex justify-around items-center gap-10'>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<ReadPost /> } />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit" element={<EditPost /> } />
          <Route path="/post/:id" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
