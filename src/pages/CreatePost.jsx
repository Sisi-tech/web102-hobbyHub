import React, { useState } from "react";
import { supabase } from "../client";

const CreatePost = () => {
    const [post, setPost] = useState({title: "", content: "", imgUrl: ""});

    const createPost = async (e) => {
        e.preventDefault();
        await supabase
            .from("hubbyHub")
            .insert({title: post.title, content: post.content, imgUrl: post.imgUrl});

        window.location = "/";
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="h-screen flex flex-col gap-6 justify-center items-center">
            <h2 className="text-3xl shadow-md">Create a new Post</h2>
            <form className="flex flex-col gap-6 bg-gray-50 p-6 pt-10 pb-10 rounded-xl">
                <div className="flex flex-col">
                    <label htmlFor="title" className="pl-2">Title</label>
                    <input 
                        id="title"
                        name="title"
                        type="text" 
                        value={post.title} 
                        onChange={handleChange}
                        className='p-2 border-2 rounded-xl'
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="content" className="pl-2">Content(Optional)</label>
                    <textarea
                        id="content"
                        name="content"
                        type="text" 
                        rows="8" 
                        cols="60" 
                        value={post.content} 
                        onChange={handleChange}
                        className="p-2 border-2 rounded-xl"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="imageUrl" className="pl-2">ImageUrl(Optional)</label>
                    <input 
                        id="imageUrl"
                        name="imageUrl"
                        type="text" 
                        value={post.imgUrl}
                        onChange={handleChange}
                        className="p-2 border-2 rounded-xl"
                    />
                </div>
                <button 
                    type="button"
                    className="bg-emerald-400 w-[200px] p-2 border-2 rounded-xl"
                    onClick={createPost}
                >
                    Create Post
                </button>
            </form>
        </div>
    )
};

export default CreatePost; 
