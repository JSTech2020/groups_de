import React, { Component } from 'react'
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'

import avatar1 from '../../assets/avatars/avatar1.png';
import avatar2 from '../../assets/avatars/avatar2.png';
import avatar3 from '../../assets/avatars/avatar3.png';
import avatar4 from '../../assets/avatars/avatar4.png';
import avatar5 from '../../assets/avatars/avatar5.png';
import avatar6 from '../../assets/avatars/avatar6.png';

const photos = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];

class AvatarSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: photos
    };
  }

  onPickImage(image) {
    this.setState({ image })
  }

  handleClick = (index) => {
    this.setState({
      selectedImage: index
    });
    console.log('index selected image: ', this.state.selectedImage);
    console.log(index);
    this.render();
  }

  render() {
    return (
      <div>
        <ImagePicker
          images={photos.map((image, i) => ({src: image, value: i}))}
          onPick={this.onPickImage.bind(this)}
        />
      </div>
    );
  }
}

export default AvatarSelection;
