import React, {setGlobal} from 'reactn';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/Main';
import './assets/css/bootstrap.min.css';
import './assets/css/paper-dashboard.css?v=2.0.0';
import './App.css';
import { setPage } from './helpers/routes';
import { load, postData } from './helpers/files';
import Dimmer from './components/modals/Dimmer';
import AddContactModal from './components/modals/AddContactModal';
import ConnectionModal from './components/modals/ConnectionModal';
import SignIn from './components/SignIn';
import Loading from './components/Loading';
import FormBuilder from './components/modals/FormBuilder';
import { getMonthDayYear } from './helpers/dateHelpers';

class App extends React.Component {
  async componentDidMount() {
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
    } else if(page === 'payment-success') {
      setGlobal({ proUser: true });
      setPage('user');
      const account = {
        proUser: true,
        initiationDate: getMonthDayYear()
      }
      const fileData = {
        fileName: 'account.json', 
        body: JSON.stringify(account),
        encrypt: true
      }
      const postedData = await postData(fileData);
      console.log(postedData);
    } else if(page === 'payment-canceled') {
      setPage('user');
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
        <FormBuilder />
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
