import React from 'react';

const Card = (props) => {
    return (
        <div className='flex flex-col gap-6 text-black bg-gray-50 w-4/5 justify-start p-4'>
            <p>Posted<span>{props.time}</span>ago</p>
            <p>{props.title}</p>
            <p>{props.vote} updates</p>
        </div>
    )
};

export default Card; 