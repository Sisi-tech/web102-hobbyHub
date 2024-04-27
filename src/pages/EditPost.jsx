import React, { useState } from "react";
import { supabase } from "../client";

const EditPost = ({ post, onClose }) => {
    const [editedTitle, setEditedTitle] = useState(post?.title || "");
    const [editedContent, setEditedContent] = useState(post?.content || "");

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from("HubbyHub")
                .update({ title: editedTitle, content: editedContent })
                .eq('id', post.id);
            // onClose();
        } catch (error) {
            console.error('Error updating post: ', error.message);
        }
        window.alert("This post has been updated successfully!");
    }

    return (
        <div className="flex flex-col justify-center items-center bg-gray-200 p-10 mt-4 gap-5 text-md rounded-md">
            <h2 className="text-2xl">Edit Post</h2>
            <div className="flex flex-col gap-2">
                <label className="text-xl">Title:</label>
                <input 
                    type="text" 
                    value={editedTitle} 
                    onChange={handleTitleChange} 
                    className="p-2 rounded-md w-[540px]"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xl">Content:</label>
                <textarea
                    rows="4" 
                    cols="60" 
                    value={editedContent} 
                    onChange={handleContentChange} 
                    className="p-2"
                />
            </div>
            <div className="flex gap-10 pt-4">
            <button className="bg-emerald-500 rounded-md p-2 text-gray-50 w-[100px] shadow-md shadow-green-100" onClick={handleSubmit}>Save</button>
            <button className="bg-emerald-500 rounded-md p-2 text-gray-50 w-[100px] shadow-md shadow-green-100" onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
};

export default EditPost; 
