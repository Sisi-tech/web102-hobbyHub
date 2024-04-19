import React, { useState, useEffect } from 'react';

const Card = (props) => {
    const [vote, setVote] = useState(() => {
        const storedVote = localStorage.getItem(`vote_${props.id}`);
        return storedVote ? parseInt(storedVote) : 0;
    });

    useEffect(() => {
        localStorage.setItem(`vote_${props.id}`, vote.toString());
    }, [vote, props.id]);


    const handleVote = () => {
        setVote(prevVote => prevVote + 1);
    }
    return (
        <div className='flex flex-col gap-6 text-black bg-gray-50 justify-start p-4 rounded-sm'>
            <p>Posted {props.time}</p>
            <p className='text-xl font-bold'>{props.title}</p>
            <p className='text-xl'>{props.content}</p>
            <img src={`data:image/jpeg;base64,${props.imgUrl}`} alt="image" />
            <div className='flex gap-4'>
                <button type="button" value={vote} onClick={handleVote}>&#128077;</button>
                <p>{vote} {vote <= 1 ? 'upvote' : 'upvotes'}</p>
            </div>
        </div>
    )
};

export default Card; 