import { postData } from "./files";

export function handleConnection(e) {
    e.preventDefault();
    //Generate encryption key to be used here
    const server = document.getElementById('server-input').value;
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    const payload = {
        server,
        username,
        password
    };

    const connectionFile = {
        fileName: 'connection.json',
        body: JSON.stringify(payload),
        encrypt: true
    }
    
    document.getElementById('server-input').value = "";
    document.getElementById('username-input').value = "";
    document.getElementById('password-input').value = "";
    const postedConnection = postData(connectionFile);
    console.log(postedConnection);
    document.getElementById('dimmer').style.display = "none";
    document.getElementById('connection-modal').style.display = "none";
}