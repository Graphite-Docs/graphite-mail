import React from 'reactn';
import { addContact, importConacts, confirmImport } from '../../helpers/lists';

export default class AddContactModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            importManually: false
        }
    }

    closeModal = () => {
        document.getElementById('contact-modal').style.display = "none";
        document.getElementById('dimmer').style.display = "none";
    }

    handleImport = (list) => {
        this.setState({ importManually: false });
        confirmImport(list);
    }

    render() {
        const { list } = this.props;
        const { importManually } = this.state;
        const { importedContacts } = this.global;
        const importedContactsFirst = importedContacts.length > 0 ? importedContacts[0] : [];
        
        return(
            <div style={{display: "none"}} id="contact-modal" className="custom-modal">
                <button onClick={this.closeModal} style={{position: "absolute", top: "15px", right: "0", marginRight: "15px"}} className="btn btn-round">X</button>
                <h3>Add Contacts</h3>
                {
                    importManually ? 
                    <p>Import from CSV</p>
                    :
                    <p>Add contacts manually or <a style={{color: "#51cbce", textDecoration: "underline"}} onClick={() => this.setState({ importManually: true })}>Import From CSV</a></p>
                    }
                <div>
                    {
                        importManually === false ? 
                        <div>
                            <form>
                                <div>
                                    <input id="name-input" placeholder="name" className="form-control" type="text" />
                                    <label>Contact Name</label>
                                    
                                    <input id="email-input" placeholder="email" className="form-control" type="email" />
                                    <label>Contact Email</label>
                                    <input id="org-input" placeholder="organization" className="form-control" type="text" />
                                    <label>Contact Organization</label>
                                </div>
                            </form>
                            <button onClick={() => addContact(list)} type="submit" className="btn btn-primary btn-round">Add</button>
                        </div>
                        :
                        <div>
                            <a style={{color: "#51cbce", textDecoration: "underline"}} onClick={() => this.setState({ importManually: false })}>Return add contacts manually</a>
                            <div>
                                <button onClick={() => document.getElementById('csv-file').click()} className="btn btn-primary btn-round">Upload CSV</button>
                                <input onChange={importConacts} accept=".csv" style={{display: "none"}} id="csv-file" type="file" />
                                <div style={{display: "none"}} id="csv-results">
                                    <h4>Verify this example contact from your CSV</h4>
                                    <p>Remember, your CSV should not include headers and should only have a "Name", "Email", and (optionally) "Organization" field, in that order.</p>
                                    <table>
                                        <thead>
                                            <tr style={{background: "#eee"}}>
                                                {
                                                    importedContactsFirst.map(item => {
                                                        return(
                                                            <th key={item + Date.now()} style={{padding: "3px", border: "0.5px solid #282828"}}>{item}</th>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                    </table>
                                    <button onClick={() =>  this.handleImport(list)} className="btn btn-round">Looks good, import CSV</button>
                                    <div>
                                        <a style={{color: "#51cbce", textDecoration: "underline"}} onClick={() => document.getElementById('csv-results').style.display = "none"}>Nope, my CSV isn't quite right, cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}