import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import Card from '../component/Card';
import getTimeDifference from '../component/GetTime';


const SinglePost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchPostById = async () => {
            try {
                const { data, error } = await supabase 
                    .from("HubbyHub")
                    .select("*")
                    .eq("id", id)
                    .single();
                if (error) {
                    throw error;
                }
                setPost(data);
            } catch (error) {
                console.error('Error fetching post: ', error.message);
            }
        };
        fetchPostById();
    }, [id]);

    const handleChange = (e) => {
        setComment(e.target.value);
    }

    return (
        <div className='h-full min-h-screen w-full flex flex-col items-center pb-20'>
            <div className='h-full min-h-screen flex flex-col w-3/5  p-10 m-10 gap-5 bg-gray-50'>
                    <div>
                        {post && (
                            <Card 
                                key={post.id}
                                id={post.id}
                                time={getTimeDifference(post.created_at)}
                                title={post.title}
                                content={post.content}
                                src={post.img_url}
                            />
                        )}
                    </div>

                <div className='flex flex-col justify-start bg-gray-300/70 p-4 gap-3'>
                        <p>Add a Comment:</p>
                        <div>
                            {comments.map((comment) => (
                                <div key={comment.id}>
                                    <p>{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                        <input 
                            type="text" 
                            value={comment} 
                            onChange={handleChange} 
                            placeholder="Leave a comment ..." 
                            className='rounded-md p-2'
                        />
                        <button 
                            type="button" 
                            className="bg-emerald-400 w-[200px] p-2 border-2 rounded-xl"
                        >
                            Submit
                        </button>
                </div>
            </div>
        </div>
    )
};

export default SinglePost; 