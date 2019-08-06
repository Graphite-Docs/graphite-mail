import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserSession } from 'blockstack';
import lists from './test_data/lists.json';
import emails from './test_data/emails.json';
import templates from './test_data/templates.json';
import { appConfig } from './utils/config';

const userSession = new UserSession({ appConfig })

setGlobal({
    userSession,
    page: "dashboard",
    listSelectionCount: 0,
    proUser: false,
    lists: [], 
    emails: [], 
    templates: [], 
    campaigns: [],
    csvFile: {}, 
    importedContacts: [], 
    emailConnected: false, 
    emailConnectionSettings: {}, 
    emailDesign: {},
    emailTemplate: {},
    showTemplate: false,
    newCampaign: false,
    selectedCampaign: {}, 
    accountInfo: {}, 
    connectionStatus: ""
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
