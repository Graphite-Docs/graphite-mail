import React, { setGlobal} from 'reactn';
import { sendCampaign } from '../../helpers/emailService';

export default class Campaign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedList: {},
            selectedTemplate: {}, 
            showFullList: false,
            submitConfirm: false
        }
    }
    handleList = (e) => {
        const { lists } = this.global;
        const selectedList = lists.filter(x => x.id === e.target.value)[0];
        console.log(selectedList);
        this.setState({ selectedList });
    }
    handleTemplate = (e) => {
        const { templates } = this.global;
        const selectedTemplate = templates.filter(x => x.id === e.target.value)[0];
        this.setState({ selectedTemplate });
    }
    closeModal = async () => {
        await setGlobal({ newCampaign: false, selectedCampaign: {} });
        document.getElementById('campaign-modal').style.display = "none";
        document.getElementById('dimmer').style.display = "none";
        if(document.getElementById('campaign-name-input')) {
            document.getElementById('campaign-name-input').value = "";
        }
    }
    handleSubmitConfirm = (e) => {
        e.preventDefault();
        const { selectedTemplate, selectedList } = this.state;
        if(!selectedTemplate.id || !selectedList.id) {
            document.getElementById('errors').style.display = "block";
        } else {
            this.setState({ submitConfirm: true });
        }
    }
    handleCancel = () => {
        this.setState({ submitConfirm: false, selectedCampaign: {}, selectedTemplate: {} });
        this.closeModal();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(document.getElementById('campaign-name-input').value && document.getElementById('campaign-name-input').value !== "") {
            const { selectedList, selectedTemplate } = this.state;
            //Build up necessary info and fire off email
            const payload = {
                recipients: selectedList.contacts.map(a => a.email),
                html: selectedTemplate.data.html,
                subject: document.getElementById('campaign-name-input').value, 
                templateName: selectedTemplate.name,
                listName: selectedList.listName 
            }
            sendCampaign(payload);
            this.setState({ selectedTemplate: {}, selectedList: {}})
        } else {
            document.getElementById('errors').style.display = "block";
        }
    }
    createList = () => {
        this.closeModal();
        setGlobal({page: 'lists'});
    }
    createTemplate = () => {
        this.closeModal();
    }
    render() {
        const { lists, templates, newCampaign, selectedCampaign } = this.global;
        const { showFullList, selectedList, submitConfirm }= this.state;
        return (
            <div style={{display: "none"}} id="campaign-modal">
                {
                    newCampaign ? 
                    lists.length > 0 ? 
                    templates.length > 0 ?
                    <div>
                        <button onClick={this.closeModal} style={{position: "absolute", top: "10px", right: "10px"}} className="btn btn-round">X</button>
                        <h3>Create a New Email Campaign</h3>
                        <form>
                            <input style={{width: "50%"}} className="form-control" type="text" id="campaign-name-input" placeholder="My new campaign" />
                            <label>Campaign Name (will also be the email subject)*</label>
                            <select style={{width: "50%"}} className="form-control" onChange={this.handleList}>
                            <option disabled selected>Select a list</option>
                            {lists.reverse().map(list => {
                                return(
                                <option key={list.id} value={list.id}>{list.listName}</option>
                                )
                            })}
                            </select>
                            <label>Choose a list*</label>
                            <select style={{width: "50%"}} className="form-control" onChange={this.handleTemplate}>
                            <option disabled selected>Select a template</option>
                            {templates.reverse().map(item => {
                                return(
                                <option key={item.id} value={item.id}>{item.name ? item.name : "Untitled"}</option>
                                )
                            })}
                            </select>
                            <label>Choose a template*</label>
                            {
                                submitConfirm ? 
                                <div>
                                    <p>Are you sure you want to send an email campaign to this list of {selectedList.contacts.length} people?</p>
                                    <button onClick={this.handleSubmit} className="btn btn-primary btn-round">Yes, send</button>
                                    <button onClick={this.handleCancel} className="btn btn-round">No, Cancel</button>
                                </div> : 
                                <div>
                                    <button onClick={this.handleSubmitConfirm} className="btn btn-primary btn-round">Save and Send</button>
                                </div>
                            }
                        </form>
                        <p>* Required</p>
                        <div style={{display: "none"}} id="errors">
                            <p style={{color: "red"}}>Please make sure all fields are completed</p>
                        </div>
                    </div> : 
                    <div>
                        <h3>You need to create an email template first</h3>
                        <button className="btn btn-primary btn-round" onClick={this.createTemplate}>Go Create a Template</button>
                    </div> : 
                    <div>
                        <h3>You need to create a mailing list first</h3>
                        <button className="btn btn-primary btn-round" onClick={this.createList}>Go Create a List</button>
                    </div> :
                    <div>
                        <button onClick={this.closeModal} style={{position: "absolute", top: "10px", right: "10px"}} className="btn btn-round">X</button>
                        <h3>Campaign Information</h3>
                        <p>Campaing Name: {selectedCampaign.name}</p>
                        <p>Date Sent: {selectedCampaign.date}</p>
                        <p>Template Used: {selectedCampaign.template}</p>
                        <p>Recipient List: <span className="link pointer" onClick={() => this.setState({showFullList: !showFullList})}>{selectedCampaign.list}</span></p>
                        {
                            showFullList ? 
                            <div>
                                <ul>
                                    {selectedCampaign.recipients.map(person => {
                                        return (
                                            <li key={person.id}>{person.name ? person.name : "No name"} | {person.email}</li>
                                        )
                                    })}
                                </ul>
                            </div> : 
                            <div style={{display: "none"}}/>
                        }

                    </div>
                }
            </div>
        )
    }
}