import './App.css';
import './Component/Sidebar.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
<<<<<<< HEAD
import WebPage from './WebPage';
import LoginPage from './LoginPage';
import LoginFail from './LoginFail';
import UsergroupEditPage from './UsergroupEditPage';
=======
import WebPage from './Pages/WebPage';
import LoginPage from './Pages/LoginPage';
>>>>>>> aea5a237e88dba4b94c588d24f2866487991b5b5

function App() {

  return (
    <div className="App" id = "app">
      <Router>
        <Switch>
          <Route exact path="/home">
            <WebPage/>
          </Route>
          <Route exact path="/">
            <LoginPage/>
          </Route>
          <Route exact path="/editUserGroup">
            <UsergroupEditPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}



export default App;
