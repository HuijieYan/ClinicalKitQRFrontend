import { createStore } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { loginReducer } from './Reducers/loginReducer';

const persistConfig = {
    key:'root',
    storage
}
const persistedReducer = persistReducer(persistConfig,loginReducer);
//for persisting states during refresh
const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store,persistor};
