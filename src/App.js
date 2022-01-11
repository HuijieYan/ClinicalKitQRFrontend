import './App.css';
import './Component/Sidebar.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import IndexMain from './Pages/IndexMain';
import LoginPage from './Pages/LoginPage';
import UsergroupEditPage from './Pages/UsergroupEditPage';
import HospitalCreationPage from './Pages/HospitalCreationPage';
import TrustCreationPage from './Pages/TrustCreationPage';
import EquipmentTable from './Pages/muiTable';
import MenuBar from './Component/MenuBar';
import EquipmentQrCodePage from './Pages/EquipmentQrCodePage';
import UserGroupTable from './Pages/usergroupTable';

function App() {

  return (
    <div className="App" id = "app">
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginPage/>
          </Route>

          <div>
            <MenuBar/>
            <Switch>
              <Route exact path="/home">
                <IndexMain/>
              </Route>
              <Route exact path="/editUserGroup">
                <UsergroupEditPage/>
              </Route>
              <Route exact path="/hospitalCreation">
                <HospitalCreationPage/>
              </Route>
              <Route exact path="/trustCreation">
                <TrustCreationPage/>
              </Route>
              <Route exact path="/equipmentTable">
                <EquipmentTable/>
              </Route>
              <Route exact path="/usergroupTable">
                <UserGroupTable/>
              </Route>
              <Route exact path="/equipment/qrcode/id=:id" render={(props)=>{
                return (<EquipmentQrCodePage id={props.match.params.id}/>)
              }}/>
            </Switch>
          </div>

        </Switch>
      </Router>
    </div>
  );
}



export default App;
