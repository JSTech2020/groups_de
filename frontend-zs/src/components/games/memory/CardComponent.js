import React from 'react';
import './index.scss';

const CardComponent = ({question,text, handleClick}) => {
    if(question === true){
    return (
        <div className='card-component' onClick={handleClick}>
            <div className='memoryImg' style={{background:'#ff4444' }}>{text}</div>
        </div>)
    }
    else {
    return (
        <div className='card-component' onClick={handleClick}>
            <div className='memoryImg' style={{background:'#47ea47' }}>{text}</div>
        </div>)
    }

};

export default CardComponent;