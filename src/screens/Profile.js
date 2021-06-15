import React from 'react'
import '../App.css'
import ProfileImage from "../assets/images/dummyprofile.jpeg";

function Profile() {
    return (
        <div>
            <img src={ProfileImage} alt="Profile" />
            <div className="heading-small">Name: </div>
            <div className="font-s">Saniya Agrawal</div>
            <div className="heading-small">Mobile: </div>
            <div className="font-s">9876543219</div>
            <div className="heading-small">Address: </div>
            <div className="font-s">Gali No. 5, Sch.No. 20, Indore, Madhya Pradesh</div>
        </div>
    )
}

export default Profile
