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
      selectedMarker: {},
      isMarkerSelected: false
    };
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
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
          latitude: lat,
          longitude: lng,
          _id:"1"
        }],
        pendingMarkers: [...previousState.pendingMarkers],
        selectedMarker: previousState.selectedMarker,
        isMarkerSelected: previousState.isMarkerSelected
      }
    })
  }

  onMarkerClick(t, marker, c) {
    console.log('marker clicked');
    console.log(marker);
    this.setState(previousState => {
      return {
        acceptedMarkerrs: [...previousState.acceptedMarkers],
        pendingMarkers: [...previousState.pendingMarkers],
        selectedMarker: marker,
        isMarkerSelected: true
      }
    })
  }

  render() {
    console.log('render');
    console.log(this.state.acceptedMarkers); 
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
          console.log(acceptedMarker),
          <Marker
            key = {acceptedMarker.id}
            position={{
              lat: acceptedMarker.latitude,
              lng: acceptedMarker.longitude
            }}
            icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
            onClick={ this.onMarkerClick
              // () => {
              // console.log('selecting marker');
              // console.log(acceptedMarker);
              // this.state.selectedMarker = acceptedMarker;
              // console.log(this.state.selectedMarker);
              // this.render();
              // }
            }
            title={acceptedMarker.firstname + " " + acceptedMarker.lastname}
            label={acceptedMarker.location}
          >
          </Marker>
        ))}

        {this.state.pendingMarkers.map(pendingMarker => (
          <Marker
            key = {pendingMarker.id}
            position={{
              lat: pendingMarker.latitude,
              lng: pendingMarker.longitude
            }}
            onClick={ this.onMarkerClick
              // () => {
              // console.log('selecting marker');
              // console.log(pendingMarker);
              // this.state.selectedMarker = pendingMarker;
              // console.log(this.state.selectedMarker);
              // this.render();
              // }
            }   
            title={pendingMarker.firstname + " " + pendingMarker.lastname}
            label={pendingMarker.location}
          >
          </Marker>
        ))}
        <InfoWindow
          onCloseClick={() => {
            this.state.selectedMarker = {};
            this.state.isMarkerSelected = false;
          }}
          // position = {{
          //   lat: this.state.selectedMarker.latitude,
          //   lng: this.state.selectedMarker.longitude
          // }}
          marker = {this.state.selectedMarker}
          visible = {this.state.isMarkerSelected}
        >
          {console.log(this.state.selectedMarker)}
          <div>
            <h2>{this.state.selectedMarker.label}</h2>
            <p>{"Reported by " + this.state.selectedMarker.title}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDfrluMAdHSTHOfGDf9fsar7YUWL9HncK4'
})(MyMap);