import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Button, FormGroup, Input } from "@material-ui/core";
import '../styles/finddoctor.css'
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMap } from 'react-leaflet'
import SearchList from "../components/SearchList";
import Loader from '../components/Loader'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../App.css';


const MAX_ZOOM = 17;

function FindDoctor() {
  const [lati, setLati] = useState(22.7);
  const [longi, setLongi] = useState(60.8);
  const [mapZoom, setMapZoom] = useState(6);
  const [map, setMap] = useState({});
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(8);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const getCurrentLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLati(pos.lat);
        setLongi(pos.lng);
        fetchNearbyDoctors(lati, longi);
      })
    }
  };

  const fetchNearbyDoctors = async (lat, long) => {
    await axios.get(`http://20.198.81.29:8080/doctor/nearby?lat=${lat}&lon=${long}&radius=1000`)
      .then(res => {
        if (res.status === 200) {
          setDoctors(res.data.content);
          console.log(res.data.content);
          setLoading(false);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }


  function LocationMarker({ doc }) {
    return (
      <Marker
        position={[doc.address.latitude, doc.address.longitude]}
        key={doc.id}
        eventHandlers = {{
          click: () => {
            setLati(doc.address.latitude);
            setLongi(doc.address.longitude);
            setZoom(15);
          }
        }}
      >
        <Popup>
          <div className="row ai-c jc-sb">
            <h2>{doc.name} ({doc.specialization.toString()})</h2>
            <b style={{ fontSize: 15 }}>{`+${doc.yearOfExperience} years experience`}</b>
          </div>
          <b>Email:</b>
          {doc.emailId}<br />
          <b>Phone:</b>
          {doc.phoneNumber}
        </Popup>
      </Marker>
    )
  }

  if (loading) {
    return (
      <div style={{ height: '100vh', overflow: 'hidden' }} className="row ai-c jc-c">
        <Loader />
      </div>
    )
  }
  else
    return (
      <>
        <MapContainer center={[lati, longi]} zoom={zoom} style={{ height: '100vh', width: '100%', position: 'relative' }}>
          <ChangeView center={[lati, longi]} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {console.log(lati, longi, zoom)}
          {doctors?.map((doc, index) => (
            <LocationMarker doc={doc} />
          )
          )}
        </MapContainer>
        <SearchList result={doctors} keyword={keyword} setKeyword={setKeyword} setLati={setLati} setLongi={setLongi} setZoom={setZoom}/>
        {/* {oldage ? <MyModal oldageId={oldage.oldage_id} show={showmodal} setShow={setShowmodal} /> : null} */}
      </>
    );
}
export default FindDoctor;
