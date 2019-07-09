import { postData } from "./files";
import { setGlobal, getGlobal } from 'reactn';
import { getMonthDayYear } from './dateHelpers'
import axios from 'axios';
const uuid = require('uuid/v4');

export function handleConnection(e) {
    e.preventDefault();
    //Generate encryption key to be used here
    const server = document.getElementById('server-input').value;
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const port = document.getElementById('port-input').value;
    const payload = {
        server,
        port,
        username,
        password
    };
    setGlobal({ emailConnectionSettings: payload, emailConnected: true });
    const connectionFile = {
        fileName: 'connection.json',
        body: JSON.stringify(payload),
        encrypt: true
    }
    document.getElementById('server-input').value = "";
    document.getElementById('port-input').value = "";
    document.getElementById('username-input').value = "";
    document.getElementById('password-input').value = "";
    const postedConnection = postData(connectionFile);
    console.log(postedConnection);
    document.getElementById('dimmer').style.display = "none";
    document.getElementById('connection-modal').style.display = "none";
}

export async function sendCampaign(params) {
      const emailConnectionSettings = getGlobal().emailConnectionSettings;
      const payload = {
          from: emailConnectionSettings.username,
          to: params.recipients.toString(),
          html: params.html,
          text: "hi",
          subject: params.subject,
          config: {
              host: emailConnectionSettings.server,
              port: emailConnectionSettings.port,
              secure: emailConnectionSettings.port === 465 ? true : false,
              auth: {
                  user: emailConnectionSettings.username,
                  pass: emailConnectionSettings.password
              },
              tls: {
                  rejectUnauthorized: false
              }
          }
      }
      console.log(payload);
      let stringified = JSON.stringify(payload);
      let parsed = JSON.parse(stringified);
      console.log(parsed);
      const instance = axios.create({
        baseURL: 'http://localhost:4001',
        headers: {
            'Content-Type': 'application/json'
        }
      });
      instance.post('/emails/new', JSON.stringify(payload))
        .then(async (res) => {
            console.log(res)
            if(res.data.messageId) {
                let campaigns = getGlobal().campaigns;
                const campaignPayload = {
                    id: uuid(), 
                    name: params.subject, 
                    template: params.templateName,
                    list: params.listName, 
                    recipients: params.recipients,
                    date: getMonthDayYear()
                }
                campaigns.push(campaignPayload);
                setGlobal({ campaigns });
                const postedData = {
                    fileName:"campaigns.json",
                    body: JSON.stringify(campaigns),
                    encrypt: true
                }
                const thisPost = await postData(postedData);
                console.log(thisPost);
                document.getElementById('campaign-modal').style.display = "none";
                document.getElementById('dimmer').style.display = "none";
                if(document.getElementById('campaign-name-input')) {
                    document.getElementById('campaign-name-input').value = "";
                }
            }
        }).catch(err => console.log(err));

}