import './App.css';
import './Component/Sidebar.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import WebPage from './Pages/WebPage';
import LoginPage from './Pages/LoginPage';
import UsergroupEditPage from './Pages/UsergroupEditPage';

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
