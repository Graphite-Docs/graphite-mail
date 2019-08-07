import React from 'reactn';
import defaultAvatar from '../assets/img/default-avatar.png';

export default class User extends React.Component {
    componentDidMount() {
      var stripe = window.Stripe('pk_test_f017dq0VLdzf22LXPBsLvuDO');

      var checkoutButton = document.getElementById('checkout-button-plan_FQJb3mLqIFimRW');
      if(checkoutButton) {
        checkoutButton.addEventListener('click', function () {
          // When the customer clicks on the button, redirect
          // them to Checkout.
          stripe.redirectToCheckout({
            items: [{plan: 'plan_FQJb3mLqIFimRW', quantity: 1}],
    
            // Do not rely on the redirect to the successUrl for fulfilling
            // purchases, customers may not always reach the success_url after
            // a successful payment.
            // Instead use one of the strategies described in
            // https://stripe.com/docs/payments/checkout/fulfillment
            successUrl: window.location.protocol + '//localhost:3000/payment-success',
            cancelUrl: window.location.protocol + '//localhost:3000/payment-canceled',
          })
          .then(function (result) {
            if (result.error) {
              // If `redirectToCheckout` fails due to a browser or network
              // error, display the localized error message to your customer.
              var displayError = document.getElementById('error-message');
              displayError.textContent = result.error.message;
            }
          });
        });
      }
      
    }
    render() {
        const { userSession, proUser, accountInfo } = this.global;
        const userData = userSession.loadUserData();
        return(
          <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-user">
                <div className="image">
                  <img src="../assets/img/damir-bosnjak.jpg" alt="..." />
                </div>
                <div className="card-body">
                  <div className="author">
                    
                    <img className="avatar border-gray" src={userData.profile.image ? userData.profile.image[0].contentUrl : defaultAvatar} alt="avatar" />
                    <h5 >{userData.profile.name ? userData.profile.name : "Anonymous"}</h5>
                   
                    <p className="description">
                      <span className="title">@{userData.username}</span>
                    </p>
                  </div>
                  <p className="description text-center">
                    {userData.profile.description ? `"${userData.profile.description}"` : ""}
                  </p>
                </div>
                <div className="card-footer">
                  <hr/>
                  <div className="button-container">
                    <div className="row">
                      <div className="col-md-12">
                        {proUser ? <h5>Mailr Pro Account</h5> : <h5>Mailr Free Account</h5>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            {/*<div className="col-md-8">
              <div className="card card-user">
                <div className="card-header">
                  <h5 className="card-title">Account Information</h5>
                </div>
                <div className="card-body">
                  {
                    proUser ? 
                    <div className="row">
                      <div className="col-md-6">
                        <h3 className="text-primary">Mailr Pro</h3>
                      </div>
                      <div className="col-md-6">
                        <button className="btn btn-round" style={{background: "red"}}>Cancel Subscription</button>
                      </div>
                    
                      <div className="col-sm-12">
                        <h3>Plan Features</h3>
                        <ul>
                          <li>Hosted Email Service</li>
                          <li>Unlimited Lists</li>
                          <li>Email Support</li>
                          <li>Mailr SDK Access</li>
                        </ul>
                      </div>
                    </div> : 
                    <div className="row">
                      <div className="col-sm-12">
                        <h3 className="text-primary">Mailr Free</h3>
                        <p>Ready to upgrade?</p>
                      </div>
                      <div className="col-md-6">
                        <h3>Mailr Pro Features</h3>
                        <ul>
                          <li>Hosted Email Service</li>
                          <li>Unlimited Lists</li>
                          <li>Email Support</li>
                          <li>Mailr SDK Access</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h3>$4.99 (USD) Per Month</h3>
                        <p>Ready to sign up?</p>
                        <button
                            className="btn btn-round btn-primary"
                            id="checkout-button-plan_FQJb3mLqIFimRW"
                            role="link"
                          >Start my subscription</button>
                          <div id="error-message"></div>
                      </div>
                    </div>
                  }
                  
                </div>
              </div>
                </div>*/}
          </div>
        </div>
        )
    }
}