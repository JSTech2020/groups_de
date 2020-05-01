import React from 'react'
import GridGallery from 'react-grid-gallery'
import { Link } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti"
import { Button, Media } from 'react-bootstrap'

export function Gallery(props) {
    if (props.location?.state?.images) {
        let images = Object.values(props.location.state.images).map((img) => {
            return { src: img, thumbnail: img, thumbnailWidth: 150, thumbnailHeight: 150 }
        })
        return (
            < div className='mt-md-3 ml-md-5 mr-md-5' >
                <div className='mb-md-3' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h2 > {props.location.state.title} Gallery</h2>
                    <Button className="btn-back" size="sm" active>
                        <Link to={"/projects/" + props.location.state.project_id} >
                            <Media>
                                <TiArrowBack size={20} />
                                <Media.Body>Back</Media.Body>
                            </Media>
                        </Link>
                    </Button>
                </div>
                <GridGallery images={images} backdropClosesModal={true}
                    enableImageSelection={false} showLightboxThumbnails={true} />
            </div >
        )
    }
    return null
}
