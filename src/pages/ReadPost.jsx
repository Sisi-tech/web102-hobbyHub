import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import Card from "../component/Card";

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

    const getTimeDifference = (createdAt) => {
        const currentTime = new Date();
        const postTime = new Date(createdAt);
        const timeDifference = currentTime.getTime() - postTime.getTime();

        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };

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
                    posts.map((post) => 
                        <Card 
                            key={post.id}
                            id={post.id}
                            time={getTimeDifference(post.created_at)}
                            title={post.title}
                            content={post.content}
                            src={post.img_url}
                        />
                    ) : []
                }
                </div>
            </div>
        </div>
    )
};

export default ReadPost; 