import { getGlobal, setGlobal } from 'reactn';
import { postData } from './files';
import Papa from 'papaparse';

import uuid from 'uuid/v4';
export async function addContact(list) {
    const proUser = getGlobal().proUser;
    const newContact = {
        id: uuid(),
        name: document.getElementById('name-input').value,
        email: document.getElementById('email-input').value,
        org: document.getElementById('org-input').value,
        dateAdded: {
            year: new Date().getFullYear().toString(),
            month: (new Date().getMonth() + 1).toString(),
            day: new Date().getDate().toString()
        }
    }
    let lists = getGlobal().lists;
    let thisList = lists.filter(item => item.id === list.id)[0];
    if(thisList) {
        let contacts = thisList.contacts;
        contacts.push(newContact);
        setGlobal({ lists });
        document.getElementById('name-input').value = "";
        document.getElementById('email-input').value = "";
        document.getElementById('org-input').value = "";
        document.getElementById('dimmer').style.display = "none";
        document.getElementById('contact-modal').style.display = "none";
        //Here we save the file
        const postedData = {
            fileName:"lists.json",
            body: JSON.stringify(lists),
            encrypt: true
        }
        const thisPost = await postData(postedData);
        console.log(thisPost);
    } else {
        console.log("Error finding specified list")
    }
}

export function deleteContact() {
//
}

export async function importConacts(e) {
    var data;
    const file = e.target.files[0];
    console.log(file);
    Papa.parse(file, {
        header: false,
        dynamicTyping: true,
        complete: function(results) {
          data = results;
          setGlobal({ importedContacts: results.data });
          document.getElementById('csv-results').style.display = "block";
        }
      });
}

export async function confirmImport(list) {
    const proUser = getGlobal().proUser;
    let importedContacts = getGlobal().importedContacts;
    let lists = getGlobal().lists;
    let thisList = lists.filter(item => item.id === list.id)[0];
    if(thisList) {
        let contacts = thisList.contacts;
        for(const contact of importedContacts) {
            if(contact[0]) {
                let newContact = {
                    id: uuid(),
                    email: contact[1],//contact[Object.keys(contact)[1]],
                    name: contact[0],//contact[Object.keys(contact)[0]],
                    org: contact[2],//contact[Object.keys(contact)[2]],
                    dateAdded: {
                        year: new Date().getFullYear().toString(),
                        month: (new Date().getMonth() + 1).toString(),
                        day: new Date().getDate().toString()
                    }
                }
                contacts.push(newContact);
            }
        }
        
        setGlobal({ lists });
        document.getElementById('csv-results').style.display = "none";
        document.getElementById('contact-modal').style.display = "none";
        document.getElementById('dimmer').style.display = "none";
        if(proUser) {
            //Will need DB and server support
        } else {
            const postedData = {
                fileName:"lists.json",
                encrypt: true, 
                body: JSON.stringify(lists)
            }
            const thisPost = await postData(postedData);
            console.log(thisPost);
        }
    }
    
}

export async function handleAddList() {
    let lists = getGlobal().lists;
    const newList = {
        id: uuid(),
        listName: document.getElementById('list-name-input').value,
        contacts: []
    }
    lists.push(newList);
    setGlobal({ lists });
    const postedData = {
        fileName:"lists.json",
        body: JSON.stringify(lists),
        encrypt: true
    }
    const thisPost = await postData(postedData);
    console.log(thisPost);
}

export async function handleDelete(listId, contactId) {
    let lists = getGlobal().lists;
    let selectedList = lists.filter(list => list.id === listId)[0];
    let contacts;
    let index;
    if(selectedList) {
        contacts = selectedList.contacts;
        index = contacts.map((x) => {return x.id }).indexOf(contactId);
        if(index > -1) {
            contacts.splice(index, 1);
            setGlobal({ lists });
            const postedData = {
                fileName:"lists.json",
                body: JSON.stringify(lists),
                encrypt: true
            }
            const thisPost = await postData(postedData);
            console.log(thisPost);
        } else {
            console.log("error with contact index");
        }
    } else {
        console.log("error finding selected list");
    }
}

export async function handleDeleteList(listId) {
    let lists = getGlobal().lists;
    let index = lists.map((x) => {return x.id }).indexOf(listId);
    if(index > -1) {
        lists.splice(index, 1);
        setGlobal({ lists });
        const postedData = {
            fileName:"lists.json",
            body: JSON.stringify(lists),
            encrypt: true
        }
        const thisPost = await postData(postedData);
        console.log(thisPost);
    } else {
        console.log("error with list index");
    }
}