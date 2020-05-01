import React from 'react';
import IconWithText from './IconWithText';
import { FaStar } from "react-icons/fa";

function Stars(props){
  const { amount, highlight, size } = props;
  let iconSize = size;
  if(!iconSize)
  iconSize = '48px';
  return <IconWithText size={iconSize} highlight={highlight} icon={<FaStar/>} text={amount} iconColor={"yellow"} textColor={"black"} />
}

export default Stars;