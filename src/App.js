import './App.css';
import './Sidebar.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import WebPage from './WebPage';
import LoginPage from './LoginPage';
import LoginFail from './LoginFail';

function App() {

  return (
    <div className="App" id = "app">
      <Router>
        <Switch>
          <Route exact path="/home">
            <WebPage/>
          </Route>
          <Route exact path="/loginFail">
            <LoginFail/>
          </Route>
          <Route exact path="/">
            <LoginPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}



export default App;
