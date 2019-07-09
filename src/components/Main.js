import React from 'reactn';
import SideBar from './SideBar';
import Nav from './Nav';
import Lists from './Lists';
import Emails from './Emails';
import User from './User';
import Footer from './Footer';
import Template from './modals/Template';
import DashboardPanel from './DashboardPanel';
import Campaign from './modals/Campaign';

export default class Main extends React.Component {

    renderPanel() {
      const { page } = this.global;
      switch(page) {
        case 'dashboard': 
          return(
            <DashboardPanel />
          )
        case 'lists': 
          return(
            <Lists />
          )
        case 'emails': 
          return(
            <Emails />
          )
        case 'user': 
          return(
            <User />
          )
      }
      
    }

    render() {
        return (
            <div>
            <div className="wrapper">
            <SideBar />
            <div id="main-panel" className="main-panel">

              <Nav />
              <Template />
              <Campaign />
              {this.renderPanel()}

              <Footer />
            </div>
          </div>
          </div>
        )
    }
}