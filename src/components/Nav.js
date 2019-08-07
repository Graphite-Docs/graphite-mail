import React from 'reactn';
import { Link } from 'react-router-dom';
import { setPage } from '../helpers/routes';
import { signOut } from '../helpers/authFunctions';

export default class Nav extends React.Component {
    handleEmailModal = () => {
        document.getElementById('connection-modal').style.display = "block";
        document.getElementById('dimmer').style.display = "block";
    }

    render() {
        const { proUser, emailConnected } = this.global;
        return (
            <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
                <div className="container-fluid">
                <div className="navbar-wrapper">
                    <div className="navbar-toggle">
                    <button type="button" className="navbar-toggler">
                        <span className="navbar-toggler-bar bar1"></span>
                        <span className="navbar-toggler-bar bar2"></span>
                        <span className="navbar-toggler-bar bar3"></span>
                    </button>
                    </div>
                    <Link to={'/'} className="navbar-brand">Mailr</Link>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navigation">
                    {/*<form>
                    <div className="input-group no-border">
                        <input style={{backgroundColor: "#fff"}} type="text" className="form-control" placeholder="Search..." />
                        <div style={{backgroundColor: "#fff"}} className="input-group-append">
                        <div style={{backgroundColor: "#fff"}} className="input-group-text">
                            <i className="nc-icon nc-zoom-split"></i>
                        </div>
                        </div>
                    </div>
                    </form>*/}
                    <ul className="navbar-nav">
                    <li className="nav-item btn-rotate dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="nc-icon nc-settings-gear-65"></i>
                        <p>
                            <span className="d-lg-none d-md-block">Settings</span>
                        </p>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" onClick={() => setPage('user')} to={'/user'}>View Profile</Link>
                        <Link className="dropdown-item" onClick={() => setPage('user')} to={'/user'}>{ proUser ? "View Account Details": "Upgrade Account"}</Link>
                        { emailConnected ? <a className="dropdown-item" onClick={this.handleEmailModal}>Edit Email Connection</a> : <a className="dropdown-item" onClick={this.handleEmailModal}>Connect Email Service</a>}
                        <a onClick={signOut} className="dropdown-item">Sign Out</a>
                        </div>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        )
    }
}