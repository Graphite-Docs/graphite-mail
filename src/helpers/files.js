import { getGlobal, setGlobal } from 'reactn';
const main = require('./main');
export function postData(params) {
  const userSession = getGlobal().userSession;
  return userSession.putFile(params.fileName, params.body, {encrypt: params.encrypt})
        .then((file) => {
            return file;
        }).catch(err => console.log(err))
}

export async function load() {
    //First we fetch the lists
    const listData = {
        fileName: "lists.json", 
        decrypt: true
    }
    const fetchedLists = await fetchData(listData);
    fetchedLists ? setGlobal({ lists: JSON.parse(fetchedLists)}) : setGlobal({ lists: [] });

    //Now we fetch email activity
    const emailData = {
        fileName: "emails.json", 
        decrypt: true
    }
    const fetchedEmails = await fetchData(emailData);
    fetchedEmails ? setGlobal({ emails: JSON.parse(fetchedEmails)}) : setGlobal({ emails: [] });
    
    //Now we fetch templates
    const templateData = {
        fileName: "templates.json", 
        decrypt: true
    }
    const fetchedTemplates = await fetchData(templateData);
    fetchedTemplates ? setGlobal({ templates: JSON.parse(fetchedTemplates)}) : setGlobal({ templates: []});

    //Now we fetch campaigns
    const campaignData = {
        fileName: "campaigns.json", 
        decrypt: true
    }
    const fetchedCampaigns = await fetchData(campaignData);
    fetchedCampaigns ? setGlobal({ campaigns: JSON.parse(fetchedCampaigns)}) : setGlobal({ campaigns: []});

    //Now we can initialize charts
    if(document.getElementById("chartHours")) {
        main.initChartsPages();
    }

    //Now we fetch the account info
    const accountData = {
        fileName: "account.json", 
        decrypt: true
    }
    const accountInfo = await fetchData(accountData);
    if(accountInfo) {
        setGlobal({ accountInfo: JSON.parse(accountInfo), proUser: true });
    }

    //Now we fetch the email connection info
    const emailConnectionData = {
        fileName: "connection.json", 
        decrypt: true
    }
    const fetchedConnection = await fetchData(emailConnectionData);
    if(fetchedConnection) {
        setGlobal({ emailConnectionSettings: JSON.parse(fetchedConnection), emailConnected: true });
    }
}

export function fetchData(params) {
    const userSession = getGlobal().userSession;
    return userSession.getFile(params.fileName, {decrypt: params.decrypt})
}