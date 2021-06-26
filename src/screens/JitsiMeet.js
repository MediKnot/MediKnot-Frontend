import React, { Component, setState } from 'react';
import axios from '../utils/BaseUrl';
import Loader from '../components/Loader';

class JitsiMeet extends Component {

    domain = 'meet.jit.si';
    api = {};

    sendMeetingLink = async (id) => {
        await axios.put(`/patient/${id}`, { meetingLink: `${this.state.room}` })
            .then(res => console.log(res.data))
            .catch(e => console.log(e));
    }

    getMeetingLink = async (id) => {
        await axios.get(`/patient/${id}`)
            .then(res => {
                this.setState({ room: res.data.meetingLink })
            })
            .catch(e => console.log(e));
    }

    constructor(props) {
        super(props);
        const user_data = JSON.parse(localStorage.getItem('user'));
        this.state = {
            room: props.isDoc ? user_data.name + 'Consultation' : this.props.meetingUrl,
            user: props.patientRef || user_data,
            isAudioMuted: true,
            isVideoMuted: true,
            admin: user_data
        }
    }

    startMeet = () => {
        const options = {
            roomName: this.state.room,
            width: '100%',
            height: 700,
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
        if (this.props.isDoc) this.sendMeetingLink(this.state.user.id);
        else this.getMeetingLink(this.state.user.id);

        if (window.JitsiMeetExternalAPI) {
            this.startMeet();
        } else {
            alert('JitsiMeetExternalAPI not loaded');
        }
        console.log(this.state.room);
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
