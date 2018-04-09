import React, { Component } from 'react';
import './chat.component.css';

class ChatComponent extends Component {
    ws = null;
    
    constructor(props) {
        super(props);
        this.state = { messages : [] };
        this.ws = new WebSocket('ws://localhost:45230');
        this.initWSEvents();
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    initWSEvents(){
        this.ws.onopen = () => {
            console.log('connected');
        };
          
        this.ws.onmessage = (received) => {
            this.setState({
                messages:[
                    ...this.state.messages,
                    {
                        text:received.data,
                        currentClient:false
                    }
                ]
            });
        };          
    }

    handleKeyUp(event) {
        if (event.keyCode === 13) {
            const message = event.target.value;
            this.setState({
                messages:[
                    ...this.state.messages,
                    {
                        text:message,
                        currentClient:true
                    }
                ]
            });
            this.ws.send(message);
            event.target.value = '';
        }
        event.preventDefault();
    }
  
    render() {
        return (
            <div className="chat-component">
                <div className="messages">
                    {
                        this.state.messages.map((message, index) => {
                            const classMessage = (message.currentClient)?'right':'left';
                            return <span key={index} className={classMessage}>{message.text}</span>;
                        })
                    }
                </div>
                <input placeholder="Tap Enter to Send..." type="text" onKeyUp={this.handleKeyUp}/>
            </div>
        );
  }
}

export default ChatComponent;

