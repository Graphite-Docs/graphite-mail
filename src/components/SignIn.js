import React from 'reactn';
import { signIn } from '../helpers/authFunctions';

export default class SignIn extends React.Component {
    render() {
        document.body.style.background = "#ddd";
        return (
            
            <div style={{marginTop: "200px"}} className="wrapper container">
                <div className="content">
                    <div className="card">
                        <div className="card-body">
                            <h1>Mailr</h1>
                            <h3>Start owning your lists</h3>
                            <p>Mailr uses Blockstack to give you control over your identity and data. Learn more about Blockstack <a href="https://blockstack.org" target="_blank">here</a>.</p>

                            <button onClick={signIn} className="btn btn-primary btn-round">Sign In With Blockstack</button>
                            <div style={{marginTop: "35px", textAlign: "center"}}>
                                <a href="https://mailr.email">About Mailr</a>
                                <p>By using Mailr, you agree to abide by the <a href="https://app.graphitedocs.com/shared/docs/jehunter5811.id&id=1565189167736cd">terms of service</a>, which include an agreement to ensure you comply with all CAN-SPAM regulations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}