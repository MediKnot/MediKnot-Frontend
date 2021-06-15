import React from 'react'
import '../App.css'
import ProfileImage from "../assets/images/dummyprofile.jpeg";

function Profile() {
    return (
        <div>
            <img src={ProfileImage} alt="Profile" />
            <div className="row ai-c">
                <div className="label">Name: </div>
                <div className="font-m text-display shadow">Saniya Agrawal</div>
            </div>
            <div className="row ai-c">
                <div className="label">Email: </div>
                <div className="font-s">snaiya@gmail.com</div>
            </div>
            <div className="row ai-c">
                <div className="label">Mobile: </div>
                <div className="font-s">9876543219</div>
            </div>
            <div className="row ai-c">
                <div className="label">Address: </div>
                <div className="font-s">Gali No. 5, Sch.No. 20, Indore, Madhya Pradesh</div>
            </div>
        </div>
    )
}

export default Profile
