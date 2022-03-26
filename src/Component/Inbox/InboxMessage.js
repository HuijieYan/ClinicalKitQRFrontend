import { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import GetData from "../../Functions/GetData";
import { getHospitalId, getUserName } from "../../Functions/UserStatus";
import { storeMailData } from "../../Storage/Actions/actions";
import mailDataReducer from "../../Storage/Reducers/mailDataReducer";
import InboxMessageList from "./InboxMessageList";

//variable used to store shares
const store = createStore(mailDataReducer);

/**
 * Show the corresponding components of sidebar button
 * @class InboxMessage
 * @memberof module:Inbox
 * @constructor
 * @param {number} selected -the selected button index
 */
const InboxMessage = ({selected}) => {
    useEffect(initializeShares, [selected]);

    /**
     * @property {Function} initializeShares -get and store received or sent shares depends on the selected button on sidebar
     */
    function initializeShares(){
        if(selected === 1){
            GetData.getReceivedSharings(getHospitalId(), getUserName()).then((data) => {
                store.dispatch(storeMailData(data));
            });
        }else if(selected === 2){
            GetData.getSentSharings(getHospitalId(), getUserName()).then((data) => {
                store.dispatch(storeMailData(data));
            });
        }
    }

    return (
        <Provider store={store}>
            <InboxMessageList selected={selected} />
        </Provider>
    );
};

export default InboxMessage;
