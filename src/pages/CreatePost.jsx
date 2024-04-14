import React, { useState } from "react";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [url, setUrl] = useState("");

    return (
        <div className="h-screen flex flex-col gap-6 justify-center items-center">
            <h2 className="text-3xl shadow-md">Create a new Post</h2>
            <form className="flex flex-col gap-6 bg-gray-50 p-6 pt-10 pb-10 rounded-xl">
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    className='p-2 border-2 rounded-xl'
                />
                <textarea
                    type="text" 
                    rows="8" 
                    cols="60" 
                    placeholder="Content(Optional)" 
                    value={content} 
                    className="p-2 border-2 rounded-xl"
                />
                <input 
                    type="text" 
                    placeholder="Image URL(Optional)" 
                    className="p-2 border-2 rounded-xl"
                />
                <button 
                    type="button"
                    className="bg-emerald-400 w-[200px] p-2 border-2 rounded-xl"
                >
                    Create Post
                </button>
            </form>
        </div>
    )
};

export default CreatePost; 
