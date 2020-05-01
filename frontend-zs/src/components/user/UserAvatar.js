import React from 'react'
import { Image } from 'react-bootstrap'

function UserAvatar(props){
  const { avatar, size } = props;
  let style = {}
  if(size){
    style.width = size;
    style.height = size;
  }
  return <Image style={style} className="user-avatar" fluid={!size} src={avatar} roundedCircle />
}

export default UserAvatar;