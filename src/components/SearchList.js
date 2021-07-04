import React, { useState } from 'react';
import '../styles/searchlist.css';
import '../App.css';
import { Avatar } from '@material-ui/core';
import Loader from './Loader';


export default function SearchList({ result, setKeyword, keyword, setLati, setLongi, setZoom}) {

  if (!result) return <Loader />
  else
    return (
      <div 
        className="list shadow" 
        style={{ backgroundColor: 'white', position: 'absolute', height: '60%', width: '20%', maxWidth: 400, minWidth: 250, top: 0, right: 0, zIndex: 1000, marginTop: '10%', marginRight: '5%', borderRadius: 10 }}
      >
        <input className="input-large shadow" placeholder="Search nearby doctors" style={{ width: '100%', alignSelf: 'center', marginTop: 5 }} onChange={(e) => setKeyword(e.target.value)} />
        <div style={{overflowY: 'scroll'}}>
          {result.length === 0 ? <h2>No doctors nearby</h2>: null}
          {result.map((data, i) => {
            if (data.name.toLowerCase().includes(keyword.toLowerCase()) || data.specialization.toString().toLowerCase().includes(keyword.toLowerCase()))
              return (
                <div className="child row ai-c" key={i} onClick={() => { setLati(data.address.latitude); setLongi(data.address.longitude); setZoom(13) }} >
                  <Avatar style={{ marginRight: 10 }}>{data.name?.charAt(0)}</Avatar>
                  <div className="info">
                    <b style={{fontSize: 15}}>{data.name}</b>
                    <p className="font">{data.specialization.toString()}</p>
                  </div>
                </div>
              )
          })}
        </div>

      </div>
    );
}
