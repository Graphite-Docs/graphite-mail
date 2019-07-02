import React from 'reactn';
import { signIn } from '../helpers/authFunctions';

export default class SignIn extends React.Component {
    render() {
        return (
            <div className="wrapper container">
                <div className="content">
                    <div className="card">
                        <div className="card-body">
                            <h3>Start owning your lists</h3>
                            <p>Email is the most powerful tool available for communication. Building a list is vital to people running newsletters and businesses alike.</p>
                            <p>Graphite Mail gives you ownership over your lists. Take them and use them somewhere else if you'd like. But always know you own the lists you build.</p>

                            <button onClick={signIn} className="btn btn-primary btn-round">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}