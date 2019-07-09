import React, { setGlobal } from 'reactn';
import sample from '../sample.json';
import EmailEditor from 'react-email-editor';
import {saveEmailTemplate} from '../../helpers/emailTemplates';
let loadExisting = true;
let loadNew = true;

export default class Template extends React.Component {
  onLoad = () => {
    if(loadNew === true) {
      document.getElementById('template-name-input').value = "";
      this.editor.loadDesign(sample)
      loadNew = false;
    }
  }
  onLoadExisting = () => {
    if(loadExisting === true) {
      const { emailTemplate } = this.global;
      console.log(emailTemplate);
      document.getElementById('template-name-input').value = "";
      this.editor.loadDesign(emailTemplate.data.design);
      loadExisting = false;
    }
  }

  saveDesign = () => {
      this.exportHtml();
      this.editor.saveDesign(design => {
        console.log('saveDesign', design)
      })
    }

    exportHtml = () => {
      this.editor.exportHtml(async (data) => {
      //   const { design, html } = data
      
        await setGlobal({ emailDesign: data});
        saveEmailTemplate();
      })
    }

    onDesignLoad = (data) => {
      console.log('onDesignLoad', data)
    }

    closeModal = async () => {
        await setGlobal({ emailTemplate: {}, showTemplate: false });
        document.getElementById('template-name-input').value = "";
        document.getElementById('dimmer').style.display = "none";
        document.getElementById('template-modal-new').style.display = "none";
        loadNew = true;
        loadExisting = true;
    }
    render() {
        const { emailTemplate, showTemplate } = this.global;
        showTemplate === true ? emailTemplate.data ? this.onLoadExisting() : this.onLoad() : console.log("nothing to load yet");
        return (
          <div style={{display: "none"}} id="template-modal-new">
              <div>
                  <input id="template-name-input" placeholder="My new template" className="form-control" type="text" />
                  <button className="btn btn-primary btn-round" onClick={this.exportHtml}>Save Design</button><button onClick={this.closeModal} style={{position: "absolute", top: "10px", right: "10px"}} className="btn btn-round">X</button>
              </div>
          <EmailEditor
              ref={editor => this.editor = editor}
              // onLoad={this.onLoad}
              // onDesignLoad={this.onDesignLoad}
          />
          </div>
        )
    }
}