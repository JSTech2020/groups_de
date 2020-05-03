import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Image from 'react-bootstrap/Image'
import DefaultImage from '../../../assets/default_image.png'

export function ImageDisplay(imageName, width, height, isCircle, onImageClick) {
    const [image, setImage] = useState("")
    useEffect(() => {
        if (!!imageName)
            Axios
                .get(process.env.REACT_APP_API_URL + ':' + process.env.REACT_APP_API_PORT
                    + '/api/media/' + imageName, { responseType: 'arraybuffer' },
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    setImage("data:;base64," + base64)
                });
    }, [imageName])
    let imageSrc = (!!imageName) ? image : DefaultImage

    return ((isCircle) ?
        < Image src={imageSrc} roundedCircle width={width} height={height} className='mr-md-3' onClick={() => onImageClick()} />
        : < Image src={imageSrc} width={width} height={height} className='mr-md-3' onClick={() => onImageClick()} />)

}
export default ImageDisplay;
