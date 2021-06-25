import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import axios from '../utils/AIBaseUrl';

class Chatbot extends Component {

  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
   this._sendMessage(message);
  }

  async callDialogFlow(data) {
    await axios.post(`/chat?text=` + data)
      .then(res => {
        if (res.status === 200) {
              var response = res.data.message;
              this.setState({
                messageList: [...this.state.messageList, {
                  author: 'them',
                  type: 'text',
                  data: {
                    "text": response
                  }
                }]
              })

          }
      })
      .catch(e => {
          console.log(e)
      })
  }

  _sendMessage(text) {
    //console.log(text);
    if (text.data.text.length > 0) {
      this.callDialogFlow(text.data.text);
    }
  }


  render() {
    return (
      <div>
        <div className="shadow" style={{ height: '75%', width: '100%', backgroundColor: 'white', borderRadius: 15 }}>
            {/* <div style={{ position: 'relative' }} className="column">
                <div className="row ai-c mh mv jc-sb">
                    <span style={{ color: 'blue', fontSize: 35 }}><strong>Meet Doc Bot</strong></span>
                    <span style={{ color: 'gray', fontSize: 20 }}> Your Personal AI Doctor</span>
                </div>
                <div className="column ai-c">
                  <strong className="row ai-c mh mv jc-sb">Interact with by clicking on icon below:</strong>
                  <strong className="row ai-c mh mv jc-sb">1. Ask about general symptoms</strong>
                  <strong className="row ai-c mh mv jc-sb">2. Discuss precautions and queries</strong>
                  <strong className="row ai-c mh mv jc-sb">3. Get feedback and what not</strong>
                  <strong className="row ai-c mh mv jc-sb">Tap to explore now!</strong>

                </div>
            </div> */}
            <Launcher
              agentProfile={{
                teamName: 'Mrs. Doc Bot.',
                imageUrl: 'https://pics.freeicons.io/uploads/icons/png/9616241991548234966-128.png'
              }}
              onMessageWasSent={this._onMessageWasSent.bind(this)}
              messageList={this.state.messageList}
              showEmoji={false}
            />
        </div>
      </div>
    )
  }
}

export default Chatbot; 