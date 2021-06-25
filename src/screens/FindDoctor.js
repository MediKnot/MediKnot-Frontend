import * as React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Button,
  FormGroup,
  Input
} from "@material-ui/core";

import '../styles/finddoctor.css'
import "../../node_modules/@tomtom-international/web-sdk-maps/dist/maps.css";
import * as tt from "@tomtom-international/web-sdk-maps";
import axios from 'axios';
import LocationCard from '../components/LocationCard';

const MAX_ZOOM = 17;

function FindDoctor() {
  const [mapLatitude, setMapLatitude] = useState(22.78);
  const [mapLongitude, setMapLongitude] = useState(77.75);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    if (e.target.value.length >= 3){
      await axios.get(`https://api.tomtom.com/search/2/search/${encodeURIComponent(e.target.value)}.JSON?key=D9T3HvijBqZXoLVYE3ClkLlWw7WGuF1k&typeahead=true&limit=5&lat=${mapLatitude}&lon=${mapLongitude}&countrySet=IN`)
        .then(res => {
          if(res.status === 200) 
          console.log(res.data)
            setData(res.data.results);
        })
        .catch(e => console.log(e));
    }
  }

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    map.setZoom(mapZoom);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }; 
        map.setCenter([parseFloat(pos.lng), parseFloat(pos.lat)]);
        setMapLatitude(pos.lat);
        setMapLongitude(pos.lng);
     })
    }
    let map = tt.map({
      key: "D9T3HvijBqZXoLVYE3ClkLlWw7WGuF1k",
      container: "map",
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom
    });
    setMap(map);
    return () => map.remove();
  }, []);

  return (
    <div>
      <Container className="mapContainer">
        <div className="row">
          <div className="col">
          <h2>Enter a Place</h2>
            <form className="row ai-c">
              <h3>Search Place: </h3>
              <input value={keyword} onChange={handleSearch} type="text" className="input-large shadow mh" placeholder="Search a place"/>
            </form>
            <div>
              {data !== null && data.length !== 0 ? data.map((place, i) => (
                <div key={i}><LocationCard data={place}/></div>
              )) : null}
            </div>
            <h4>Map Controls</h4>
            <FormGroup>
              <p for="latitude">Latitude</p>
              <Input
                type="text"
                name="latitude"
                value={mapLatitude}
                onChange={(e) => setMapLatitude(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <p for="longitude">Longitude</p>
              <Input
                type="text"
                name="longitude"
                value={mapLongitude}
                onChange={(e) => setMapLongitude(e.target.value)}
              />
            </FormGroup>
            <div className="col" >
              <div className="row">Zoom</div>
              <div className="row">
                <Button outline color="primary" onClick={decreaseZoom}>
                  -
                </Button>
                <div className="mapZoomDisplay">{mapZoom}</div>
                <Button outline color="primary" onClick={increaseZoom}>
                  +
                </Button>
              </div>
            </div>
            <div className="col" >
              <div className="row" className="updateButton">
                <Button color="primary" onClick={updateMap}>
                  Update Map
                </Button>
              </div>
            </div>
          </div>
          
          <Container id="map" className="mapDiv"></Container>
        </div>
      </Container>
    </div>
  );
}

export default FindDoctor;
