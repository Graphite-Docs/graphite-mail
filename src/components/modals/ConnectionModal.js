import React from 'reactn';
import { handleConnection, connectedHostedService } from '../../helpers/emailService';

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
        const { emailConnected, emailConnectionSettings, proUser } = this.global;
        console.log(emailConnectionSettings)
        const { edit } = this.state;
        return (
            <div style={{display: "none"}} id="connection-modal" className="custom-modal">
                <button onClick={this.closeModal} style={{position: "absolute", top: "15px", right: "0", marginRight: "15px"}} className="btn btn-round">X</button>
                {
                    !emailConnected ? 
                    <div>
                        <h3>Connect Email Service</h3>
                        <p>Note: Gmail does not always work properly and is not an ideal account to use. If using Gmail, you will need to enable <a href="https://support.google.com/accounts/answer/6010255?hl=en">"Less Secure"</a> apps as Mailr does not support OAuth at this time. Mailr holds no liability if you choose to go this route and we recommend you use a different email service instead.</p>
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
                            {
                                proUser ? 
                                <div>
                                    <p>Alternatively, you can connect to Mailr's hosted email service</p>
                                    <button onClick={connectedHostedService} className="btn btn-round">Use Hosted Service</button>
                                </div> : 
                                <div/>
                            }
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
                            {
                                proUser ? 
                                <div>
                                    <p>Alternatively, you can connect to Mailr's hosted email service</p>
                                    <button onClick={connectedHostedService} className="btn btn-round">Use Hosted Service</button>
                                </div> : 
                                <div/>
                            }
                        </form>
                    </div> : 
                    emailConnectionSettings.useHostedService ? 
                    <div>
                        <div>
                            <h3 style={{marginTop: "25px"}}>You are using Mailr's hosted email service</h3>
                            <p>Would you like to connect to your own email provider?</p>
                            <button onClick={() => this.setState({ edit: true})} className="btn btn-round">Yes</button>
                        </div>
                    </div> : 
                    <div>
                        <h3>Email Service</h3>
                        <p>SMTP Server URL: <span>{emailConnectionSettings.server}</span></p>
                        <p>Port: <span>{emailConnectionSettings.port}</span></p>
                        <p>Username: <span>{emailConnectionSettings.username}</span></p>
                        <p>Password: <span className="hidden-field">{emailConnectionSettings.password.replace(/./gi, "*")}</span></p>
                        <button onClick={() => this.setState({ edit: true })}className="btn btn-round">Make Changes?</button>
                        {
                            proUser ? 
                            <div>
                                <p>Or, you can connect to Mailr's hosted email service</p>
                                <button onClick={connectedHostedService} className="btn btn-round">Use Hosted Service</button>
                            </div> : 
                            <div/>
                        }
                    </div>
                }
           
            </div>
        )
    }
}