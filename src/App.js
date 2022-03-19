import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import IndexMain from "./Pages/IndexMain";
import LoginPage from "./Pages/LoginPage";
import EditUsergroup from "./Pages/EditUsergroup";
import MenuBar from "./Component/MenuBar";
import EquipmentQrCodePage from "./Pages/EquipmentQrCodePage";
import UsergroupTable from "./Pages/UsergroupTable";
import EquipmentTable from "./Pages/EquipmentTable";
import IssueTable from "./Pages/IssueTable";
import EditEquipment from "./Pages/EditEquipment";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Storage/storeConfiguration";
import ContactBook from "./Pages/ContactBook";
import Inbox from "./Pages/Inbox";
import GuardedRoute from "./Component/GuardedRoute";
import SearchPage from "./Pages/SearchPage";
import SearchResult from "./Pages/SearchResult";
import ViewEquipment from "./Pages/ViewEquipment";
import PreviewEquipment from "./Pages/PreviewEquipment";
import Reports from "./Pages/Reports";
import HospitalTable from "./Pages/HospitalTable";
import UserProfile from "./Pages/UserProfile";
import FAQ from "./Pages/FAQ";
import "./_theme.scss";
import {checkLogIn} from "./Functions/LoginFunctions";
import DownloadFile from "./Component/DownloadFile";

//This page is responsible for matching path with pages
function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App" id="app" style={{textAlign: "center"}}>
          <Router>
            <Switch>
              <Route exact path="/">
                {checkLogIn() ? <Redirect to="/login"/> : <Redirect to="/home"/>}
              </Route>
                
              <Route exact path="/login">
                <LoginPage />
              </Route>

              <GuardedRoute
                  render={(props) => {return (<DownloadFile id={props.match.params.id}/>);}}
                  path="/file/download/:id"
                  component={null}
                  requireLevel={1}
              />

              <div>
                <MenuBar />
                <Switch>
                  <GuardedRoute component={<IndexMain />} path="/home" requireLevel={1} />

                  <GuardedRoute component={<FAQ />} path="/faq" requireLevel={1} />

                  <GuardedRoute component={<UserProfile />} path="/user" requireLevel={1} />

                  <GuardedRoute
                    render={(props) => {
                      return (
                        <EditUsergroup
                          groupUsername={props.match.params.username}
                          selectedHospitalId={props.match.params.hospitalId}
                        />
                      );
                    }}
                    path="/editUserGroup/username=:username/hospitalId=:hospitalId"
                    component={null}
                    requireLevel={2}
                  />

                  <GuardedRoute
                    component={<EditUsergroup />}
                    path="/editUserGroup"
                    requireLevel={2}
                  />

                  <GuardedRoute
                    component={<EquipmentTable />}
                    path="/equipmentTable"
                    requireLevel={2}
                  />

                  <GuardedRoute
                    component={<UsergroupTable />}
                    path="/usergroupTable"
                    requireLevel={2}
                  />

                  <GuardedRoute
                    component={<HospitalTable />}
                    path="/hospitalTable"
                    requireLevel={3}
                  />

                  <GuardedRoute component={<IssueTable />} path="/issueTable" requireLevel={2}/>

                  <GuardedRoute
                    render={(props) => {
                      return <EditEquipment id={props.match.params.id} />;
                    }}
                    path="/editEquipment/id=:id"
                    component={null}
                    requireLevel={2}
                  />

                  <GuardedRoute
                    component={<EditEquipment />}
                    path="/editEquipment"
                    requireLevel={2}
                  />

                  <GuardedRoute
                    component={<ContactBook />}
                    path="/contactBook"
                    requireLevel={2}
                  />

                  <GuardedRoute component={<Inbox />} path="/inbox" requireLevel={2}/>

                  <GuardedRoute component={<Reports />} path="/reports" requireLevel={2}/>

                  <GuardedRoute
                    render={(props) => {
                      return <EquipmentQrCodePage id={props.match.params.id} />;
                    }}
                    path="/equipment/qrcode/id=:id"
                    component={null}
                    requireLevel={2}
                  />

                  <GuardedRoute
                    render={(props) => {
                      return <ViewEquipment id={props.match.params.id} />;
                    }}
                    path="/viewEquipment/id=:id"
                    component={null}
                    requireLevel={1}
                  />

                  <GuardedRoute
                    render={(props) => {
                      return <PreviewEquipment id={props.match.params.id} />;
                    }}
                    path="/previewEquipment/id=:id"
                    component={null}
                    requireLevel={2}
                  />

                  <GuardedRoute component={<SearchPage />} path="/search" requireLevel={1}/>

                  <GuardedRoute
                    render={(props) => {
                      return (
                        <SearchResult
                          name={props.match.params.name}
                          category={props.match.params.category}
                          type={props.match.params.type}
                          manufacturer={props.match.params.manufacturer}
                          model={props.match.params.model}
                        />
                      );
                    }}
                    path={"/result/name=:name/category=:category/type=:type/manufacturer=:manufacturer/model=:model"}
                    component={null}
                    requireLevel={1}
                  />
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
