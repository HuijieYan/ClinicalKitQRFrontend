import './App.css';
import './Component/Sidebar.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import IndexMain from './Pages/IndexMain';
import LoginPage from './Pages/LoginPage';
import UsergroupEditPage from './Pages/UsergroupEditPage';
import HospitalCreationPage from './Pages/HospitalCreationPage';
import TrustCreationPage from './Pages/TrustCreationPage';
import MenuBar from './Component/MenuBar';
import EquipmentQrCodePage from './Pages/EquipmentQrCodePage';
import UsergroupTable from './Pages/UsergroupTable';
import EquipmentTable from './Pages/EquipmentTable';
import IssueTable from './Pages/IssueTable';
import EditEquipment from "./Pages/EditEquipment";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Storage/storeConfiguration';
import ContactBook from './Pages/contactBook';
import Inbox from './Pages/inbox';
import UploadedFiles from './Pages/UploadedFiles';

function App() {
  
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App" id = "app">
          <Router>
            <Switch>
              <Route exact path="/">
                <LoginPage/>
              </Route>
              <Route exact path="/uploadedFiles/:id" render={(props)=>{
                    return (<UploadedFiles id={props.match.params.id}/>)
                  }}/>

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
                    <UsergroupTable/>
                  </Route>
                  <Route exact path="/issueTable">
                    <IssueTable/>
                  </Route>
                  <Route exact path="/editEquipment">
                    <EditEquipment/>
                  </Route>
                  <Route exact path="/contactBook">
                    <ContactBook/>
                  </Route>
                  <Route exact path="/inbox">
                    <Inbox/>
                  </Route>
                  <Route exact path="/equipment/qrcode/id=:id" render={(props)=>{
                    return (<EquipmentQrCodePage id={props.match.params.id}/>)
                  }}/>
                  
                </Switch>
              </div>

            </Switch>
          </Router>
        </div>
    </PersistGate>
    </Provider>
  );
}



export default App;
