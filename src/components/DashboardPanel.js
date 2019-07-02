import React from 'reactn';
import { Link } from 'react-router-dom';
import { setPage } from '../helpers/routes';
const main = require('../helpers/main');

export default class DashboardPanel extends React.Component {
    componentDidMount() {
        main.initChartsPages();
    }
    render() {
        const { lists, proUser, emails, templates } = this.global;
        const totalContacts = lists.flatMap((item) => item.contacts);
        const totalEmailsSent = emails.flatMap((email) => email.to);
        return(
            <div className="content">
                <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                    <div className="card-body ">
                        <div className="row">
                        <div className="col-5 col-md-4">
                            <div className="icon-big text-center icon-warning">
                            <i className="fa fa-users text-warning"></i>
                            </div>
                        </div>
                        <div className="col-7 col-md-8">
                            <div className="numbers">
                            <p className="card-category">Total Contacts</p>
                            <p className="card-title">{totalContacts.length}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="card-footer ">
                        <hr/>
                        <div className="stats">
                            <Link onClick={() => setPage('lists')} to={'/lists'}><i className="fa fa-user-plus"></i> Add Contacts</Link>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                    <div className="card-body ">
                        <div className="row">
                        <div className="col-5 col-md-4">
                            <div className="icon-big text-center icon-warning">
                            <i className="nc-icon nc-delivery-fast text-success"></i>
                            </div>
                        </div>
                        <div className="col-7 col-md-8">
                            <div className="numbers">
                            <p className="card-category">Emails Delivered</p>
                            <p className="card-title">{totalEmailsSent.length}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="card-footer ">
                        <hr/>
                        <div className="stats">
                            <Link onClick={() => setPage('emails')} to={'/emails'}><i className="fa fa-paper-plane"></i> Send New Email</Link>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                    <div className="card-body ">
                        <div className="row">
                        <div className="col-5 col-md-4">
                            <div className="icon-big text-center icon-warning">
                                <i className="fa fa-object-group text-danger"></i>
                            </div>
                        </div>
                        <div className="col-7 col-md-8">
                            <div className="numbers">
                            <p className="card-category">Templates</p>
                            <p className="card-title">{templates.length}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="card-footer ">
                        <hr/>
                        <div className="stats">
                            <Link onClick={() => setPage('emails')} to={'/emails'}><i className="fa fa-plus-square"></i> Create New Template</Link>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="card card-stats">
                    <div className="card-body ">
                        <div className="row">
                        <div className="col-5 col-md-4">
                            <div className="icon-big text-center icon-warning">
                                <i className="fa fa-th-list text-primary"></i>
                            </div>
                        </div>
                        <div className="col-7 col-md-8">
                            <div className="numbers">
                            <p className="card-category">Lists</p>
                            <p className="card-title">{lists.length}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="card-footer ">
                        <hr/>
                        <div className="stats">
                            {
                                proUser ? <Link onClick={() => setPage('lists')} to={'/lists'}><i className="fa fa-folder"></i> Create New List</Link> : 
                                <Link onClick={() => setPage('user')} to={'/user'}><i className="fa fa-lock"></i> Upgrade to Add Lists</Link>
                            }
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-md-8">
                    <div style={{paddingBottom: "8px"}} className="card ">
                    <div className="card-header ">
                        <h5 className="card-title">Contacts By Month</h5>
                        <p className="card-category">In Current Calendar Year</p>
                    </div>
                    <div className="card-body ">
                        <canvas id="chartHours" width="400" height="100"></canvas>
                    </div>
                    
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card ">
                    <div className="card-header ">
                        <h5 className="card-title">Email Statistics</h5>
                        <p className="card-category">All-Time Performance</p>
                    </div>
                    <div className="card-body ">
                        <canvas id="chartEmail"></canvas>
                        <div className="legend">
                        <i style={{marginLeft: "3px"}} className="fa fa-circle text-primary"></i> Opened
                        <i style={{marginLeft: "3px"}} className="fa fa-circle text-warning"></i> Read
                        <i style={{marginLeft: "3px"}} className="fa fa-circle text-gray"></i> Clicks
                        </div>
                    </div>
                    
                    </div>
                </div>
                </div>
                <div className="row">
                
                {/*<div className="col-md-8">
                    <div className="card card-chart">
                    <div className="card-header">
                        <h5 className="card-title">NASDAQ: AAPL</h5>
                        <p className="card-category">Line Chart with Points</p>
                    </div>
                    <div className="card-body">
                        <canvas id="speedChart" width="400" height="100"></canvas>
                    </div>
                    <div className="card-footer">
                        <div className="chart-legend">
                        <i className="fa fa-circle text-info"></i> Tesla Model S
                        <i className="fa fa-circle text-warning"></i> BMW 5 Series
                        </div>
                        <hr/>
                        <div className="card-stats">
                        <i className="fa fa-check"></i> Data information certified
                        </div>
                    </div>
                    </div>
                </div>*/}
                </div>
            </div>
        )
    }
}