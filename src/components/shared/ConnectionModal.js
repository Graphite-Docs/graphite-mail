import React from 'reactn';
import { handleConnection } from '../../helpers/emailService';

export default class ConnectionModal extends React.Component {
    closeModal = () => {
        document.getElementById('dimmer').style.display = "none";
        document.getElementById('connection-modal').style.display = "none";
    }
    render() {
        return (
            <div style={{display: "none"}} id="connection-modal" className="custom-modal">
                <button onClick={this.closeModal} style={{position: "absolute", top: "15px", right: "0", marginRight: "15px"}} className="btn btn-round">X</button>
                <h3>Connect Email Service</h3>
                <form onSubmit={(e) => handleConnection(e)}>
                    <input className="form-control" placeholder="smtp.your-email.com" type="text" />
                    <label>SMTP Server URL</label>
                    <input className="form-control" placeholder="johnnycash@email.com" type="text" />
                    <label>Email Address or Username</label>
                    <input className="form-control" placeholder="Password" type="password" />
                    <label>Password</label>
                </form>
                <button type="submit" className="btn btn-primary btn-round">Connect</button>
            </div>
        )
    }
}