import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { supabase } from "../client";
import Card from "../component/Card";
import getTimeDifference from "../component/GetTime";

const ReadPost = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from("HubbyHub")
                    .select('*');
                if (error) {
                    throw error;
                }
                let sortedData;
                if (sortBy == 'newest') {
                    sortedData = data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                } else if (sortBy == 'mostPopular') {
                    sortedData = data.slice().sort((a, b) => b.vote - a.vote );
                }
                setPosts(sortedData);
                console.log(data);
            } catch (error) {
                console.error("Error fetching posts: ", error.message);
            }
        }
        fetchPost();
    }, [sortBy]);

    useEffect(() => {
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPosts(filteredPosts);
    }, [searchQuery]);

    const handleSort = (sortType) => {
        setSortBy(sortType);
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    return (
        <div className="h-full min-h-screen w-full flex flex-col items-center pb-20">
            <div className="h-full flex flex-col w-3/5 pt-10 gap-5">
                <div className="flex gap-3 justify-between">
                    <div className="flex gap-3 justify-start items-center">
                        <p className="text-xl">Order by:</p>
                        <button 
                            type="button" 
                            className="bg-emerald-500 rounded-md p-2 text-gray-50 w-[80px] shadow-md shadow-green-100"
                            onClick={() => handleSort('newest')}
                        >
                            Newest
                        </button>
                        <button 
                            type="button" 
                            className="bg-emerald-500 rounded-md p-2 text-gray-50 w-[120px] shadow-md shadow-green-100"
                            onClick={() => handleSort('mostPopular')}
                        >
                            Most Popular
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="rounded-full p-2 w-[300px] border-solid shadow-md text-black text-xl"
                        onChange={handleSearch}
                        value={searchQuery}
                    />
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