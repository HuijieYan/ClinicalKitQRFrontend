import './App.css';
import './Component/Sidebar.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import WebPage from './Pages/WebPage';
import LoginPage from './Pages/LoginPage';

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
        </Switch>
      </Router>
    </div>
  );
}



export default App;
