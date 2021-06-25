import React, { Component, setState } from 'react';
import axios from '../utils/BaseUrl';

class JitsiMeet extends Component {

    domain = 'meet.jit.si';
    api = {};

    getUser = async (id) => {
        await axios.get(`/patient/${id}`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        user: res.data,
                    });
                }
            })
            .catch(e => console.log(e))
            alert(this.state.room);
    }

    constructor(props) {
        super(props);
        const user_data = JSON.parse(localStorage.getItem('user'));
        this.state = {
            room: user_data.name+'Consultation',
            user: {},
            isAudioMuted: true,
            isVideoMuted: true,
            admin: user_data
        }
    }

    componentDidMount(){
        this.getUser();
    }
    
    startMeet = () => {
        const options = {
            roomName: this.state.room,
            width: '100%',
            height:  700,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.state.admin.name
            }
        }
        this.api = new window.JitsiMeetExternalAPI(this.domain, options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }

    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
        //return this.props.history.push('/thank-you');
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }


    componentDidMount() {
        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
    }

    render() {
        const { isAudioMuted, isVideoMuted } = this.state;
        return (
            <>
            <header className="nav-bar">
                <p className="item-left heading">Connect with Patient</p>
            </header>
            <div id="jitsi-iframe"></div>
            </>
        );
    }
}

export default JitsiMeet;
