import React from 'reactn';
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/img/default-avatar.png';
import { setPage } from '../helpers/routes';

export default class SideBar extends React.Component {  
    
    render() {
        const { page, userSession } = this.global;
        const { username, profile} = userSession.loadUserData();
        return (
            <div id="sidebar" className="sidebar" data-color="white" data-active-color="danger">
                <div className="logo">
                    <a className="simple-text logo-mini">
                    <div className="logo-image-small">
                        <img src={profile.image ? profile.image.filter(a => a.name === "avatar") ? profile.image.filter(a => a.name === "avatar")[0].contentUrl : defaultAvatar : defaultAvatar} />
                    </div>
                    </a>
                    <a className="simple-text logo-normal">
                    {profile.name ? profile.name : username}
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                    <li className={page === "dashboard" ? "active" : ""}>
                        <Link to={'/dashboard'} onClick={() => setPage('dashboard')} className="button-link">
                        <i className="nc-icon nc-chart-pie-36"></i>
                        <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className={page === "lists" ? "active" : ""}>
                        <Link to={'/lists'} onClick={() => setPage('lists')}>
                        <i className="nc-icon nc-bullet-list-67"></i>
                        <p>Lists</p>
                        </Link>
                    </li>
                    <li className={page === "emails" ? "active" : ""}>
                        <Link to={'/emails'} onClick={() => setPage('emails')}>
                        <i className="nc-icon nc-email-85"></i>
                        <p>Emails</p>
                        </Link>
                    </li>
                    <li className={page === "user" ? "active" : ""}>
                        <Link to={'user'} onClick={() => setPage('user')}>
                        <i className="nc-icon nc-settings-gear-65"></i>
                        <p>User Profile</p>
                        </Link>
                    </li>
                    </ul>
                </div>
                </div>
        )
    }
}
