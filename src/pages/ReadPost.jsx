import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import Card from "../component/Card";

const ReadPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from("hubbyHub")
                    .select();
                if (error) {
                    throw error;
                }
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts: ", error.message);
            }
        }
        fetchPost();
    }, []);

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="h-full flex flex-col w-3/5 pt-10 gap-5">
                <div className="flex gap-3 justify-start">
                    <p>Order by:</p>
                    <button 
                        type="button" className="bg-emerald-700 rounded-md p-1 text-gray-50">Newest</button>
                    <button type="button" className="bg-emerald-500 rounded-md p-1 text-gray-50">Most Popular</button>
                </div>
                <div>
                {
                    posts && posts.length > 0 ?
                    posts.map((post) => 
                        <Card 
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            content={post.content}
                            src={post.imgUrl}
                        />
                    ) : []
                }
            </div>
            </div>
        </div>
    )
};

export default ReadPost; 