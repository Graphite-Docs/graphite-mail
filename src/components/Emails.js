import React from 'reactn';
import ConnectEmailService from './ConnectEmailService';

export default class Emails extends React.Component {
    render() {
        const { emailConnected } = this.global;
        return(
            <div className="content">
              {
                emailConnected ? 
                <div className="row">

                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h4>Templates <span style={{fontSize: "12px", position: "relative", top: "-5px", left: "10px"}}><button onClick={this.handleNewTemplate} className="btn btn-primary btn-round">New Template</button></span></h4>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className=" text-primary">
                              <tr>
                                <th>
                                  Template Name
                                </th>
                                <th>
                                  Date Created
                                </th>
                                <th></th>
                              </tr>
                            </thead>

                          </table>
                        </div>
                      </div>
                    </div>   
                  </div>

                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h4>Email Campaigns <span style={{fontSize: "12px", position: "relative", top: "-5px", left: "10px"}}><button onClick={this.handleNewCampaign} className="btn btn-info btn-round">New Campaign</button></span></h4>
                        <div className="table-responsive">
                          <table className="table">
                            <thead className=" text-info">
                              <tr>
                                <th>
                                  Campaign Name
                                </th>
                                <th>
                                  Template Used
                                </th>
                                <th>List</th>
                                <th></th>
                              </tr>
                            </thead>

                          </table>
                        </div>
                      </div>
                    </div>   
                  </div>
                </div>  : 
                <ConnectEmailService />
              }
                      
              </div>
        )
    }
}