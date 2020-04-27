import React from 'react';
import IconWithText from './IconWithText';
import { FaStar } from "react-icons/fa";

function Stars(props){
  const { amount, highlight } = props;
  return <IconWithText highlight={highlight} icon={<FaStar/>} text={amount} iconColor={"yellow"} textColor={"black"} />
}

export default Stars;