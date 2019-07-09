import { getGlobal, setGlobal } from 'reactn';
import { postData } from './files';
import { template } from '@babel/core';
const uuid = require('uuid/v4');
export async function saveEmailTemplate() {
    let templates = getGlobal().templates;
    const id = uuid();
    const name = document.getElementById('template-name-input').value;
    const data = getGlobal().emailDesign;
    const archived = false;
    const newTemplate = new EmailTemplate(id, name, data, archived);
    templates.push(newTemplate);

    await setGlobal({ templates });
    document.getElementById('template-name-input').value = "";
    document.getElementById('dimmer').style.display = "none";
    document.getElementById('template-modal-new').style.display = "none";
    const postedData = {
        fileName:"templates.json",
        encrypt: true, 
        body: JSON.stringify(templates)
    }
    const thisPost = await postData(postedData);
    console.log(thisPost);
    setGlobal({ emailDesign: {} });
}

export async function handleDelete(templateId) {
    let templates = getGlobal().templates;
    let index = templates.map((x) => {return x.id }).indexOf(templateId);
    if(index > -1) {
        templates.splice(index, 1);
        setGlobal({ templates });
        const postedData = {
            fileName:"templates.json",
            body: JSON.stringify(templates),
            encrypt: true
        }
        const thisPost = await postData(postedData);
        console.log(thisPost);
    } else {
        console.log("error with templates index");
    }
}


class EmailTemplate {
    constructor(id, name, data, archived) {
        this.id = id;
        this.name = name;
        this.data = data;
        this.archived = archived;
    }
}