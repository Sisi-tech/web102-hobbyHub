import React, { useState } from "react";
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
        <div className='w-full flex justify-around items-center bg-emerald-400 p-2 text-white text-2xl'>
          <h2 className='text-3xl'>HubbyHub</h2>
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
