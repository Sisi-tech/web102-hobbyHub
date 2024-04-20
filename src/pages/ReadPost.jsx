import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { supabase } from "../client";
import Card from "../component/Card";
import getTimeDifference from "../component/GetTime";

const ReadPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from("HubbyHub")
                    .select('*');
                if (error) {
                    throw error;
                }
                setPosts(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching posts: ", error.message);
            }
        }
        fetchPost();
    }, []);

    return (
        <div className="h-full min-h-screen w-full flex flex-col items-center pb-20">
            <div className="h-full flex flex-col w-3/5 pt-10 gap-5">
                <div className="flex gap-3 justify-start">
                    <p>Order by:</p>
                    <button 
                        type="button" className="bg-emerald-700 rounded-md p-1 text-gray-50">Newest</button>
                    <button type="button" className="bg-emerald-500 rounded-md p-1 text-gray-50">Most Popular</button>
                </div>
                <div className="flex flex-col gap-6">
                {
                    posts && posts.length > 0 ?
                    posts.map((post) => (
                        <Link to={`/post/${post.id}`} key={post.id}>
                            <Card 
                            key={post.id}
                            id={post.id}
                            time={getTimeDifference(post.created_at)}
                            title={post.title}
                            content={post.content}
                            src={post.img_url}
                            />
                        </Link>
                    )) : []
                }
                </div>
            </div>
        </div>
    )
};

export default ReadPost; 