import React from 'reactn';
import { handleConnection } from '../../helpers/emailService';

export default class ConnectionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }
    closeModal = () => {
        document.getElementById('dimmer').style.display = "none";
        document.getElementById('connection-modal').style.display = "none";
    }

    handleConnection = (e) => {
        this.setState({ edit: false });
        handleConnection(e);
    }
    render() {
        const { emailConnected, emailConnectionSettings } = this.global;
        const { edit } = this.state;
        return (
            <div style={{display: "none"}} id="connection-modal" className="custom-modal">
                <button onClick={this.closeModal} style={{position: "absolute", top: "15px", right: "0", marginRight: "15px"}} className="btn btn-round">X</button>
                {
                    !emailConnected ? 
                    <div>
                        <h3>Connect Email Service</h3>
                        <form onSubmit={(e) => handleConnection(e)}>
                            <input id="server-input" className="form-control" placeholder="smtp.your-email.com" type="text" />
                            <label>SMTP Server URL</label>
                            <input id="port-input" className="form-control" placeholder="465" type="text" />
                            <label>Port</label>
                            <input id="username-input" className="form-control" placeholder="johnnycash@email.com" type="text" />
                            <label>Email Address or Username</label>
                            <input id="password-input" className="form-control" placeholder="Password" type="password" />
                            <label>Password</label>
                            <div>
                                <button type="submit" className="btn btn-primary btn-round">Connect</button>
                            </div>
                            
                        </form>
                    </div> : 
                    edit ? 
                    <div>
                        <h3>Update Email Service</h3>
                        <form onSubmit={(e) => this.handleConnection(e)}>
                            <input id="server-input" className="form-control" placeholder="smtp.your-email.com" type="text" />
                            <label>SMTP Server URL</label>
                            <input id="port-input" className="form-control" placeholder="465" type="text" />
                            <label>Port</label>
                            <input id="username-input" className="form-control" placeholder="johnnycash@email.com" type="text" />
                            <label>Email Address or Username</label>
                            <input id="password-input" className="form-control" placeholder="Password" type="password" />
                            <label>Password</label>
                            <div>
                                <button type="submit" className="btn btn-primary btn-round">Connect</button> <button onClick={() => this.setState({ edit: false })} className="btn btn-round">Cancel</button>
                            </div>
                            
                        </form>
                    </div> : 
                    <div>
                        <h3>Email Service</h3>
                        <p>SMTP Server URL: <span>{emailConnectionSettings.server}</span></p>
                        <p>Port: <span>{emailConnectionSettings.port}</span></p>
                        <p>Username: <span>{emailConnectionSettings.username}</span></p>
                        <p>Password: <span className="hidden-field">{emailConnectionSettings.password}</span></p>
                        <button onClick={() => this.setState({ edit: true })}className="btn btn-round">Make Changes?</button>
                    </div>
                }
                
            </div>
        )
    }
}