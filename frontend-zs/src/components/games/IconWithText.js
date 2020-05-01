import React from 'react';
import { IconContext } from "react-icons";
import './IconWithText.css';

function IconWithText(props){

  let { icon, text, size, iconColor, textColor, highlight } = props;
  if(!size){
    size = '48px';
  }

  let iconStyle = { 
    verticalAlign: 'middle', 
    width: size, 
    height: size 
  };

  let textStyle = {};

  if(iconColor){
    iconStyle.fill = iconColor;
    iconStyle.stroke = 'black';
    iconStyle.strokeWidth = "3";
  }

  if(textColor){
    textStyle.color = textColor;
  }

  let classNames = "icon-with-text";
  if(highlight)
    classNames += " highlight";

  return (
    <IconContext.Provider value={{ style: iconStyle}}>
      <div style={{width: size, height: size, zIndex: 9999}} className={classNames}>
        <span style={textStyle} className="center">{text}</span>
        {icon}
      </div>
    </IconContext.Provider>
  )
}

export default IconWithText;