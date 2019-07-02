import React from 'reactn';
import SideBar from './SideBar';
import Nav from './Nav';
import Lists from './Lists';
import Emails from './Emails';
import User from './User';
import Footer from './Footer';
import DashboardPanel from './DashboardPanel';

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

              {this.renderPanel()}

              <Footer />
            </div>
          </div>
          </div>
        )
    }
}