import React, { useState } from 'react';

const Card = (props) => {
    const [vote, setVote] = useState(0);

    const handleVote = () => {
        setVote(vote + 1);
    }
    return (
        <div className='flex flex-col gap-6 text-black bg-gray-50 justify-start p-4 rounded-sm'>
            {/* <p>Posted<span>{props.time}</span>ago</p> */}
            <p className='text-xl font-bold'>{props.title}</p>
            <p className='text-xl'>{props.content}</p>
            <img src={`data:image/jpeg;base64,${props.imgUrl}`} alt="image" />
            <div className='flex gap-4'>
                <button type="button" value={vote} onClick={handleVote}>&#128077;</button>
                {
                    vote < 2 ? (
                        <p>{vote} upvote</p>
                    ): <p>{vote} upvotes</p>
                }
            </div>
        </div>
    )
};

export default Card; 