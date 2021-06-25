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

const MAX_ZOOM = 17;

function FindDoctor() {
  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const [mapZoom, setMapZoom] = useState(13);
  const [map, setMap] = useState({});

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
    let map = tt.map({
      key: "D9T3HvijBqZXoLVYE3ClkLlWw7WGuF1k",
      container: "map",
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom
    });
    console.log(map);
    setMap(map);
    //return () => map.remove();
  }, []);

  return (
    <div>
      <Container className="mapContainer">
        <div className="row">
          <div className="col">
            <h4>Map Controls</h4>
            <FormGroup>
              <p for="longitude">Longitude</p>
              <Input
                type="text"
                name="longitude"
                value={mapLongitude}
                onChange={(e) => setMapLongitude(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <p for="latitude">Latitude</p>
              <Input
                type="text"
                name="latitude"
                value={mapLatitude}
                onChange={(e) => setMapLatitude(e.target.value)}
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
