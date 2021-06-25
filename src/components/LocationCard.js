import React from 'react'
import '../App.css';

function LocationCard({ data }) {
    return (
        <div style={{ width: '100%', backgroundColor: '#F2A253', borderRadius: 15 }} className="shadow p-1 mv">
            <h3>{data.address.freeformAddress + ', ' + data.address.country}</h3>
        </div>
    )
}


export default LocationCard
