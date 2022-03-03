import "./App.css";
import "./Component/Sidebar.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import ContactBook from "./Pages/contactBook";
import Inbox from "./Pages/Inbox";
import UploadedFiles from "./Pages/UploadedFiles";
import GuardedRoute from "./Component/GuardedRoute";
import SearchPage from "./Pages/SearchPage";
import SearchResult from "./Pages/SearchResult";
import ViewEquipment from "./Pages/ViewEquipment";
import PreviewEquipment from "./Pages/PreviewEquipment";
import Reports from "./Pages/Reports";
import HospitalTable from "./Pages/HospitalTable";
import UserProfile from "./Pages/UserProfile";
import FAQ from "./Pages/FAQ";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="App" id="app">
          <Router>
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>

              <GuardedRoute
                render={(props) => {
                  return <UploadedFiles id={props.match.params.id} />;
                }}
                path="/uploadedFiles/:id"
                component={null}
              />

              <div>
                <MenuBar />
                <Switch>
                  <GuardedRoute component={<IndexMain />} path="/home" />

                  <GuardedRoute component={<FAQ />} path="/faq" />

                  <GuardedRoute component={<UserProfile />} path="/user" />

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
                  />

                  <GuardedRoute
                    component={<EditUsergroup />}
                    path="/editUserGroup"
                  />

                  <GuardedRoute
                    component={<EquipmentTable />}
                    path="/equipmentTable"
                  />

                  <GuardedRoute
                    component={<UsergroupTable />}
                    path="/usergroupTable"
                  />

                  <GuardedRoute
                    component={<HospitalTable />}
                    path="/hospitalTable"
                  />

                  <GuardedRoute component={<IssueTable />} path="/issueTable" />

                  <GuardedRoute
                    render={(props) => {
                      return <EditEquipment id={props.match.params.id} />;
                    }}
                    path="/editEquipment/id=:id"
                    component={null}
                  />

                  <GuardedRoute
                    component={<EditEquipment />}
                    path="/editEquipment"
                  />

                  <GuardedRoute
                    component={<ContactBook />}
                    path="/contactBook"
                  />

                  <GuardedRoute component={<Inbox />} path="/inbox" />

                  <GuardedRoute component={<Reports />} path="/reports" />

                  <GuardedRoute
                    render={(props) => {
                      return <EquipmentQrCodePage id={props.match.params.id} />;
                    }}
                    path="/equipment/qrcode/id=:id"
                    component={null}
                  />

                  <GuardedRoute
                    render={(props) => {
                      return <ViewEquipment id={props.match.params.id} />;
                    }}
                    path="/viewEquipment/id=:id"
                    component={null}
                  />

                  <GuardedRoute
                    render={(props) => {
                      return <PreviewEquipment id={props.match.params.id} />;
                    }}
                    path="/previewEquipment/id=:id"
                    component={null}
                  />

                  <GuardedRoute component={<SearchPage />} path="/search" />

                  <GuardedRoute
                    render={(props) => {
                      return (
                        <SearchResult
                          name={props.match.params.name}
                          category={props.match.params.category}
                          type={props.match.params.type}
                        />
                      );
                    }}
                    path={"/result/name=:name/category=:category/type=:type"}
                    component={null}
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
