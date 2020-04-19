import React, { Component, useState } from 'react';
import { Map,GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class MyMap extends Component {
  static defaultProps = {
    center: {
      lat: 39.9522,
      lng: -75.1932
    },
    zoom:16
  }

  constructor(props){
    super(props);
    this.state = {
      acceptedMarkers: [],
      pendingMarkers: [],
      selectedMarker: null
    };
    this.onMapClick = this.onMapClick.bind(this);
  }

  async componentDidMount() {
    // sync with backend later
    const acceptedDataRaw = await axios.get('/api/getAllAlerts');
    const acceptedData = acceptedDataRaw.data;
    console.log('printing accepeted Markers');
    console.log(acceptedData);
    this.setState({acceptedMarkers: acceptedData})
    console.log(this.state.acceptedMarkers);

    const pendingDataRaw = await axios.get('/api/getAllRequests');
    const pendingData = pendingDataRaw.data;
    console.log('printing pending Markers');
    console.log(pendingData);
    this.setState({pendingMarkers: pendingData}) 
    console.log(this.state.pendingMarkers);
  }

  onMapClick(t, map, c) {
    const {latLng} = c;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log(lat);
    console.log(lng);
    this.setState(previousState => {
      return {
        acceptedMarkers: [...previousState.acceptedMarkers, {
          title: "",
          name:"",
          position: {lat, lng}
        }],
        pendingMarkers: [...previousState.pendingMarkers],
        selectedMarker: previousState.selectedMarker
      }
    })
    console.log(this.state.acceptedMarkers);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={16}
        style={mapStyles}
        initialCenter={{
         lat: 39.9522,
         lng: -75.1932
        }}
        onClick={this.onMapClick}
      >
        {this.state.acceptedMarkers.map(acceptedMarker => (
          <Marker
            key = {acceptedMarker.id}
            position={{
              lat: acceptedMarker.latitude,
              lng: acceptedMarker.longitude
            }}
          >
            onClick{() => {
              console.log('selecting marker');
              console.log(acceptedMarker);
              this.state.selectedMarker = acceptedMarker;
            }}  
          </Marker>
        ))}
        {this.state.selectedMarker && (
          <InfoWindow
            onCloseClick={() => {
              this.state.selectedMarker = null;
            }}
            position = {{
              lat: this.state.selectedMarker.latitude,
              lng: this.state.selectedMarker.longitude
            }}
          >
            <div>
              <h2>{this.state.selectedMarker.title}</h2>
              <p>{this.state.selectedMarker.description}</p>
            </div>
          </InfoWindow>
        )}
         {this.state.pendingMarkers.map(pendingMarker => (
          <Marker
            key = {pendingMarker.id}
            position={{
              lat: pendingMarker.latitude,
              lng: pendingMarker.longitude
            }}
            icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
          >
            onClick{() => {
              console.log('selecting marker');
              console.log(pendingMarker);
              this.state.selectedMarker = pendingMarker;
            }}  
          </Marker>
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDfrluMAdHSTHOfGDf9fsar7YUWL9HncK4'
})(MyMap);