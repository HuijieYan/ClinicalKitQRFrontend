import { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import GetData from "../../Functions/GetData";
import { getHospitalId, getUserName } from "../../Functions/UserStatus";
import { storeMailData } from "../../Storage/Actions/actions";
import mailDataReducer from "../../Storage/Reducers/mailDataReducer";
import InboxMessageList from "./InboxMessageList";

const store = createStore(mailDataReducer);

const InboxMessage = ({selected}) => {
  useEffect(() => {
    if(selected === 1){
      GetData.getReceivedSharings(getHospitalId(), getUserName()).then((data) => {
          store.dispatch(storeMailData(data));
      });
    }else if(selected === 2){
      GetData.getSentSharings(getHospitalId(), getUserName()).then((data) => {
            store.dispatch(storeMailData(data));
      });
    }
  }, [selected]);

  return (
    <Provider store={store}>
      <InboxMessageList selected={selected} />
    </Provider>
  );
};

export default InboxMessage;
