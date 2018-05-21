import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapWithAMarker = withGoogleMap(props => {
    return (
        <GoogleMap defaultZoom={12} defaultCenter={{ lat: props.marker.lat, lng: props.marker.lng }}>
            {props.marker &&
                <Marker label={props.marker.name} position={{ lat: props.marker.lat, lng: props.marker.lng }} />
            }
        </GoogleMap>
    );
});

export default class Map extends Component {
    render() {
        const { marker } = this.props;

        return (
            <MapWithAMarker marker={marker} containerElement={<div className="mapContainer full-flex" />} mapElement={<div className="map" style={{ height: "300px" }} />} />
        );
    }
}

Map.propTypes = {
    marker: PropTypes.object
};
