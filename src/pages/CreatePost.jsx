import React, { useState } from "react";
import { supabase } from "../client";

const CreatePost = () => {
    const [post, setPost] = useState({title: "", content: "", img_url: ""});

    const createPost = async (e) => {
        e.preventDefault();
        if (post.title.trim().length == 0) {
            alert("Please enter a title");
            return;
        }
        await supabase
            .from("HubbyHub")
            .insert({title: post.title, content: post.content, img_url: post.img_url});

        window.location = "/";
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            if (reader.result) {
                console.log("Reader result:", reader.result); // Log the result
                setPost((prev) => ({
                    ...prev,
                    img_url: reader.result,
                }));
            } else {
                console.error("Reader result is empty");
            }
        };        
    
        reader.onerror = () => {
            console.error("Error reading file:", reader.error);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        } else {
            console.error("No file selected");
        }
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
                        rows="4" 
                        cols="60" 
                        value={post.content} 
                        onChange={handleChange}
                        className="p-2 border-2 rounded-xl"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="image" className="pl-2">ImageUrl(Optional)</label>
                    <input
                        id="image"
                        name="img_url"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-2 border-2 rounded-xl"
                    />
                    {post.img_url && <img src={post.img_url} alt="Uploaded image" className="mt-2 w-[200px]" />}
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
