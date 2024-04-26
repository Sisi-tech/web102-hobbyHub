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
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <h2>Edit Post</h2>
            <label>Title:</label>
            <input type="text" value={editedTitle} onChange={handleTitleChange} />
            <label>Content:</label>
            <textarea value={editedContent} onChange={handleContentChange} />
            <button onClick={handleSubmit}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    )
};

export default EditPost; 
