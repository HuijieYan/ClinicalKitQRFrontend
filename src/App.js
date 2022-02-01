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
import { checkLogIn } from './Functions/LoginFunctions';
import GaurdedRoute from './Component/GuardedRoute';

function App() {
  
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App" id = "app">
          <Router>
            <Switch>
              <Route exact path="/login">
                <LoginPage/>
              </Route>

              <GaurdedRoute render={(props)=>{
                    return (<UploadedFiles id={props.match.params.id}/>)
                  }} path="/uploadedFiles/:id"/>

              <div>
                <MenuBar/>
                <Switch>
                  <GaurdedRoute component={<IndexMain/>} path="/home"/>

                  <GaurdedRoute component={<UsergroupEditPage/>} path="/editUserGroup"/>

                  <GaurdedRoute component={<HospitalCreationPage/>} path="/hospitalCreation"/>

                  <GaurdedRoute component={<TrustCreationPage/>} path="/trustCreation"/>

                  <GaurdedRoute component={<EquipmentTable/>} path="/equipmentTable"/>

                  <GaurdedRoute component={<UsergroupTable/>} path="/usergroupTable"/>

                  <GaurdedRoute component={<IssueTable/>} path="/issueTable"/>

                  <GaurdedRoute component={<EditEquipment/>} path="/editEquipment"/>

                  <GaurdedRoute component={<ContactBook/>} path="/contactBook"/>

                  <GaurdedRoute component={<Inbox/>} path="/inbox"/>

                  <GaurdedRoute render={(props)=>{
                    return (<EquipmentQrCodePage id={props.match.params.id}/>)
                  }} path="/equipment/qrcode/id=:id"/>
                  
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
