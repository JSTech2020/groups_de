import React, { Component } from 'react';

class Map extends Component {
    constructor(props) {
        super(props);
        this.onMapLoad = this.onMapLoad.bind(this)
        this.state = { selectedInfoWindow: null }
    }

    onMapLoad() {
        const map = new window.google.maps.Map(document.getElementById(this.props.id), this.props.options);
        this.props.projects.forEach(project => {
            if (!!project.location) {
                const marker = new window.google.maps.Marker({
                    position: { lat: project.location[0], lng: project.location[1] },
                    map: map,
                    title: project.title
                })
                const infowindow = new window.google.maps.InfoWindow({
                    content: project.title
                });
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                    if (!!this.state.selectedInfoWindow) {
                        this.state.selectedInfoWindow.close()
                    }
                    if (this.state.selectedInfoWindow === infowindow)
                        this.setState({ selectedInfoWindow: null })
                    else
                        this.setState({ selectedInfoWindow: infowindow })
                }.bind(this));
            }

        })
    }

    componentDidMount() {
        if (!window.google) {
            this.setupMapScript()
        }
        else {
            this.onMapLoad()
        }
    }

    setupMapScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}`;
        script.id = 'googleMaps';
        document.body.appendChild(script);
        script.addEventListener('load', e => {
            this.onMapLoad()
        })
    }

    hasDifferentProps(prevProps, newProps) {
        if (prevProps.size !== newProps.size)
            return true
        for (var prop of prevProps) if (!newProps.has(prop)) return true;
        return false;

    }
    componentDidUpdate(prevProps) {
        if (window.google && this.hasDifferentProps(new Set(prevProps.projects.map(project => project.title)), new Set(this.props.projects.map(project => project.title)))) {
            this.setupMapScript()
        }
    }

    render() {
        return (
            <div className={'ml-md-2 mt-md-3'} style={{ width: this.props.width, height: this.props.height }} id={this.props.id} />
        );
    }
}

export default Map;
