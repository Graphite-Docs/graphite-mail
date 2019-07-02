import React from 'reactn';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/Main';
import './App.css';
import { setPage } from './helpers/routes';
import { load } from './helpers/files';
import Dimmer from './components/shared/Dimmer';
import AddContactModal from './components/shared/AddContactModal';
import ConnectionModal from './components/shared/ConnectionModal';
import SignIn from './components/SignIn';
import Loading from './components/Loading';

class App extends React.Component {
  componentDidMount() {
    const { userSession} = this.global;
    if(userSession.isSignInPending()) {
        userSession.handlePendingSignIn().then(async () => {
           window.location = window.location.origin;
        });
    }
    load()
    const page = window.location.pathname.split('/')[1];
    if(page === '') {
      setPage('dashboard');
    } else {
      setPage(page);
    }
  }

  render() {
    const { userSession, lists, listSelectionCount } = this.global;
    return (
      <div>
        <Dimmer />
        <AddContactModal 
          list={lists[listSelectionCount]}
        />
        <ConnectionModal />
        <BrowserRouter>
          {
            userSession.isUserSignedIn() ? 
            <Main /> : 
            window.location.href.includes('?authResponse') || window.location.href.includes('?echoReply') ? 
            <Loading /> :
            <SignIn />
          }
          
        </BrowserRouter>
        
      </div>
    );
  }
}

export default App;
