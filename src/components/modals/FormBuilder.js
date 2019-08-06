import React from 'reactn';
import codeSnippet from './snippet.json';

export default class FormBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: false,
            org: false,
            snippet: false
        }
    }
    handleClose = () => {
        document.getElementById('form-builder-modal').style.display = "none";
        document.getElementById('dimmer').style.display = "none";
    }
    handleCheckbox = (e, type) => {
        if(type === "name") {
            this.setState({ name: !this.state.name});
        } 
        if(type === "org") {
            this.setState({ org: !this.state.org });
        }
    }
    handleSnippet = (e) => {
        e.preventDefault();
        const { snippet } = this.state;
        this.setState({ snippet: !snippet });
    }

    renderView() {
        const { snippet, name, org } = this.state;
        const { proUser } = this.global;
        
        if(snippet) {
            return (
                <div>
                    <h3>Your Code Snippet</h3>
                    <code>
                        {name && org ? codeSnippet.emailNameOrg : name ? codeSnippet.emailName : org ? snippet.emailOrg : codeSnippet.emailOnly}
                    </code>
                    <div>
                        <button onClick={this.copy} className="btn btn-round btn-primary">Copy</button>
                        <button onClick={this.handleSnippet} className="btn btn-round">Cancel</button>
                    </div>                    
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.handleClose} className="btn btn-round" style={{float: "right", marginRight: "5px"}}>X</button>
                    <h3>Add Contacts to This List With a Form</h3>
                    <p>Choose what pieces of information you'd like to collect:</p>
                    <form onSubmit={this.handleSnippet}>
                        <input className="checkbox-control" type='checkbox' disabled checked />
                        <label>Email</label><br/>
                        <input className="checkbox-control" type='checkbox' onClick={(e) => this.handleCheckbox(e, 'name')} />
                        <label>Name</label><br/>
                        <input className="checkbox-control" type='checkbox' onClick={(e) => this.handleCheckbox(e, 'org')} />
                        <label>Organization</label><br/>
                        <button type="submit" className="btn btn-round btn-primary">Generate Snippet</button> or {proUser ? <button className="btn btn-round">Use the SDK</button> : <button className="btn btn-round">Upgrade to Use the SDK</button>}
                        <p>You'll use the generated code snippet on your website. If you are a Pro user, you can generate an API key and use the JavaScript SDK to further customize how you post data to your email lists.</p>
                    </form>
                </div>
            )
        }
    }

    render() {
        const selection = {
            name: this.state.name,
            org: this.state.org
        }
        return (
            <div style={{display: "none"}} id="form-builder-modal" className="full-modal container">
                {this.renderView()}
            </div>
        )
    }
}