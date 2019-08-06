import React from 'reactn';
import { connectedHostedService } from '../helpers/emailService';

export default class ConnectEmailService extends React.Component {
    handleConnectionModal = () => {
        document.getElementById('connection-modal').style.display = "block";
        document.getElementById('dimmer').style.display = "block";
    }
    render() {
        const { connectionStatus } = this.global;
        return (
            <div className="content">
                <div className="row">

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4><i style={{position: "relative", top: "3px", marginRight: "5px"}} className="nc-icon nc-settings-gear-65 text-primary"></i> Connect to your own email service</h4>
                                <div className="card-body">
                                    <p>If you'd like to use your own email provider to send emails, you'll need the following: </p>
                                    <ul>
                                        <li>Host server URL (ex: smtp.your-email.com)</li>
                                        <li>Username for email service</li>
                                        <li>Password for email service</li>
                                    </ul>
                                    <p>It's important to note that to connect to your own email service, you will be sending your username and password through Mailr to a server. That information is not sent in plain text. It is encrypted, but upon delivery to the server it needs to be decrypted to be useful.</p>
                                    <p>This is how all services work that allow you to connect to your own providers, but if you are uncomfortable with this, please consider paying for the hosted email service.</p>
                                    <button onClick={this.handleConnectionModal} className="btn btn-primary btn-round">Ok, Connect</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4><i style={{position: "relative", top: "3px", marginRight: "5px"}} className="nc-icon nc-email-85 text-info"></i> Use Mailr's hosted service</h4>
                                <div className="card-body">
                                    <p>Mailr manages a hosted service through <a href="https://sendgrid.com">SendGrid</a>. As SendGrid is a paid service and there is significant overhead in managing emails for users who choose this service, it may be part of a paid plan in the future. For now, it is free to use.</p>
                                    <button onClick={connectedHostedService} className="btn btn-info btn-round">{connectionStatus === "" ? "Use Hosted Service" : connectionStatus}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}