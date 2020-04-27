import React from 'react';

function PuzzleTile(props){
  const { image, correctPosition, currentPosition, finished, hidden, onClick } = props;

  // Translate the tile based on the change from it's correct position/origin
  const translateX = 100 * (currentPosition.x - correctPosition.x);
  const translateY = 100 * (currentPosition.y - correctPosition.y);
  const tileStyle = {
    transform: `translate(${translateX}%, ${translateY}%)`
  }
  const tileInnerStyle = {
    backgroundImage: `url(${image})`,
    backgroundPosition: `${-100 * correctPosition.x}% ${-100 * correctPosition.y}%`
  }
  let tileClasses = "puzzle-tile";
  if(finished)
    tileClasses += " puzzle-tile-finished";
  else if(hidden)
    tileClasses += " puzzle-tile-hidden";

  return <>
  <div 
    onClick={() => onClick(correctPosition, currentPosition)}
    className={tileClasses}
    style={tileStyle}
  >
    <div style={tileInnerStyle}></div>
  </div>
  </>
}

export default PuzzleTile;