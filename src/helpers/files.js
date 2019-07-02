import { getGlobal, setGlobal } from 'reactn';
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
    setGlobal({ lists: JSON.parse(fetchedLists || [])});

    //Now we fetch email activity
    const emailData = {
        fileName: "emails.json", 
        decrypt: true
    }
    const fetchedEmails = await fetchData(emailData);
    setGlobal({ emails: JSON.parse(fetchedEmails || [])});

    //Now we fetch templates
    const templateData = {
        fileName: "templates.json", 
        decrypt: true
    }
    const fetchedTemplates = await fetchData(templateData);
    setGlobal({ templates: JSON.parse(fetchedTemplates || [])});
}

export function fetchData(params) {
    const userSession = getGlobal().userSession;
    return userSession.getFile(params.fileName, {decrypt: params.decrypt})
}