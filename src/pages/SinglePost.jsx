import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../component/Card';
import getTimeDifference from '../component/GetTime';

const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // fetch post
                const { data: postData, error: postError } = await supabase
                    .from("HubbyHub")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (postError) {
                    throw postError;
                }
                
                setPost(postData); // Moved setPost inside the try block to ensure it's called after successful fetch
            } catch (error) {
                console.error("Error message: ", error.message);
            }
        };
        fetchPost(); // Removed redundant setPost(postData) here
    }, [id]);

    return (
        <div className='h-full min-h-screen w-full flex flex-col items-center pb-20'>
            <div className='h-full min-h-screen flex flex-col w-3/5 p-10 m-10 gap-5 bg-gray-50'>
                {post ? (
                    <Card
                        title={post.title}
                        content={post.content}
                        src={post.img_url}
                        time={getTimeDifference(post.created_at)}
                    />
                ) : (
                    <p>"Post is loading ..."</p>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
