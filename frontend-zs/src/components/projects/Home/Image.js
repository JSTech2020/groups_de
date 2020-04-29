import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Image from 'react-bootstrap/Image'

export function ImageDisplay(imageName, width, height, isCircle) {
    const [image, setImage] = useState("")
    useEffect(() => {
        if (!!imageName)
            Axios
                .get(
                    'http://localhost:3001/api/media/' + imageName,
                    { responseType: 'arraybuffer' },
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

    return (!!imageName) ? (
        (isCircle) ?
            < Image src={image} roundedCircle width={width} height={height} className='mr-md-3' />
            : < Image src={image} width={width} height={height} className='mr-md-3' />

    ) : null
}
export default ImageDisplay;
