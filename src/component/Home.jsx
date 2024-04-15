import React from "react";

const Home = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="h-full w-3/5 flex flex-col pt-10">
                <div className="flex gap-3 justify-start">
                    <p>Order by:</p>
                    <button 
                        type="button" className="bg-emerald-700 rounded-md p-1 text-gray-50">Newest</button>
                    <button type="button" className="bg-emerald-500 rounded-md p-1 text-gray-50">Most Popular</button>
                </div>
            </div>
        </div>
    )
};

export default Home;
