import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { supabase } from "../client";

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

    const handleDelete = async () => {
        try {
            const { data, error } = await supabase
                .from("HubbyHub")
                .delete()
                .eq('id', props.id);
            if (error) {
                throw error;
            }
            console.log('post deleted successfully');
            window.alert('This post has been deleted successfully');
        } catch (error) {
            console.error("Error deleting post: ", error.message);
        }
    };

    return (
        <div className='flex flex-col gap-6 text-black bg-gray-50 justify-start p-4 rounded-md'>
            <p className='text-xl font-bold'>{props.title}</p>
            {props.content && <p className='text-xl'>{props.content}</p>}
            {props.src && <img src={props.src} alt="image" className='w-[180px]' />}
            <p>Posted {props.time}</p>
            <div className='flex justify-between'>
                <div className='flex gap-4'>
                    <button type="button" value={vote} onClick={handleVote}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </button>
                    <p>{vote} {vote <= 1 ? 'upvote' : 'upvotes'}</p>
                </div>
                <div className='flex gap-4'>
                    <button type="button" className='text-gray-500 hover:text-gray-900'>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button 
                        type="button" 
                        className='text-gray-500 hover:text-gray-900'
                        onClick={handleDelete}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Card; 