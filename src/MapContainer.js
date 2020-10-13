import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: "50%",
  height: "50%"
}

export class MapContainer extends Component {
    
    constructor() {
        super()
        this.state = {
            showingInfoWindow: false,  // Hides or shows the InfoWindow
            activeMarker: {},          // Shows the active marker upon click
            selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
        }


    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    })

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    renderMarkers() {
        return this.props.graduates.map(graduate => {
           return (
           <Marker
            key={graduate.id}
            onClick={this.onMarkerClick}
            position={graduate.location}
            name={graduate.name}
            company={graduate.company}
            salary={graduate.salary} 
            /> 
        )})
    }
    renderWindows() {
      return this.props.graduates.map(graduate => {
        return <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                  
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                    <h4>{this.state.selectedPlace.company}</h4>
                    <h4>{this.state.selectedPlace.salary}</h4>
                  </div>
                </InfoWindow>
      })
    }

    componentDidMount(){
      document.getElementsByClassName('map-container')[0].firstElementChild.style.height="100%"
    }
    
  render() {
    return (
        <div className="map-container">
      <Map
        google={this.props.google}
        zoom={4}
        style={mapStyles}
        initialCenter={
          {
            lat: 37.09024,
            lng: -95.712891
          }
        }
      >
          {this.renderMarkers()}
          {this.renderWindows()}
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API_KEY
})(MapContainer);

