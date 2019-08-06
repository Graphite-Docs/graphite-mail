import React from 'reactn';
import { signIn } from '../helpers/authFunctions';
import './css/vendor/normalize.css';
import './css/vendor/font-awesome/css/font-awesome.min.css';
import './css/vendor/lity.css';
import './css/vendor/slick.css';
import './css/vendor/slick-theme.css';
import './css/style.css';
import './css/responsive.css';

export default class SignIn extends React.Component {
    render() {
        return (
            <div>
            <header>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="navbar-brand">
                            <a className="logo js-scroll-trigger" href="#saieum">Mailr</a>
                        </div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav left-menu">
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#whyus">Why Mailr</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#screenshot">Features</a>
                            </li>
                        
                            </ul>
                            <ul className="right-menu">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Use Mailr Now</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <section id="pt-slider">
                <div className="container">
                    <div className="slider-content-pt">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 order-sm-1 order-2">
                                <div className="slider-content-wrapper">
                                    <div className="welcome-text">
                                        <h1 className="slider-title">Mailr gives you control over your email lists</h1>
                                        <p className="slider-text">Email communication remains one of, if not the, most powerful ways of connecting with others. Your email lists are precious. Protect them by owning them outright. Mailr gives you complete ownership of your email lists while still providing the power of email campaign design and email sending.</p>
                                        <button onClick={signIn} className="pt-button light"><span>Get Started For Free</span></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 order-sm-2 order-1">
                                <div className="slider-content-wrapper-image">
                                    <div className="welcome-text">
                                        <img src={require("./img/video_image.png")} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="whyus">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="pt-title title-center" >
                                <h2>Why Mailr</h2>
                                <h6>Email marketing tools are a dime a dozen, but do any of them ensure that you will never lose access to your email lists?</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="whyus-item">
                                <img src={require("./img/whyus1.png")} alt="" />
                                <h5>No Email Address Leakage</h5>
                                <p>When you own the email lists, you control how those lists are protected. No more fear of private info being leaked.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="whyus-item">
                                <img src={require("./img/whyus2.png")} alt="" />
                                <h5>Secure Contacts Like You Secure Your House</h5>
                                <p>With state of the art encryption, your campaign templates and email contacts are protected.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="whyus-item">
                                <img src={require("./img/whyus3.png")} alt="" />
                                <h5>Grow Your List</h5>
                                <p>Import CSV files with contacts or add them one at a time. You're in control.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="whyus-item">
                                <img src={require("./img/whyus4.png")} alt="" />
                                <h5>Target Your Message</h5>
                                <p>Campaign templates let you design email messaging that is specific to your contacts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="screenshot">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="pt-title title-center">
                                <h2>Features</h2>
                                <h6>Know your contacts, know your campaigns, know your position.</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <section className="screenshot slider">
                                <div className="screenshot-item">
                                    <img src={require("./img/screenshot.jpg")} alt="" />
                                    <div style={{margin: "20px", textAlign: "center"}}>
                                        <h3>Clean Dashboard for Information at a Glance</h3>
                                    </div>
                                </div>
                                <div className="screenshot-item">
                                    <img src={require("./img/screenshot2.jpg")} alt="" />
                                    <div style={{margin: "20px", textAlign: "center"}}>
                                        <h3>Full email template editor</h3>
                                    </div>
                                </div>
                                <div className="screenshot-item">
                                    <img src={require("./img/screenshot3.jpg")} alt="" />
                                    <div style={{margin: "20px", textAlign: "center"}}>
                                        <h3>Import lists or add contacts ad hoc.</h3>
                                    </div>
                                </div>
                                <div style={{margin: "20px", textAlign: "center"}}>
                                    <button onClick={signIn} className="pt-button light"><span>Get Started For Free</span></button>
                                </div>
                                
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }
}

{/* <div style={{marginTop: "200px"}} classNameName="wrapper container">
                <div classNameName="content">
                    <div classNameName="card">
                        <div classNameName="card-body">
                            <h3>Start owning your lists</h3>
                            <p>Email is the most powerful tool available for communication. Building a list is vital to people running newsletters and businesses alike.</p>
                            <p>Mailr gives you ownership over your lists. Take them and use them somewhere else if you'd like. But always know you own the lists you build.</p>

                            <button onClick={signIn} classNameName="btn btn-primary btn-round">Sign In</button>
                        </div>
                    </div>
                </div>
            </div> */}