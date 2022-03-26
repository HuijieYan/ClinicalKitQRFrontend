import { storeExpireTime, storeHospitalId, storeLevel, storeName, storePassword, storeRedirection, storeTrustId, storeUsername } from "../Storage/Actions/actions";
import { store } from "../Storage/storeConfiguration";

/**
 * @memberof module:Functions
 * @class Controller for dispatch the local stored information
 */
export function setUserName(name){
    store.dispatch(storeUsername(name));
}

export function setName(name){
    store.dispatch(storeName(name));
}

export function setLevel(level){
    store.dispatch(storeLevel(level));
}

export function setTrustID(id){
    store.dispatch(storeTrustId(id));
}

export function setHospitalID(id){
    store.dispatch(storeHospitalId(id));
}

export function setExpireTime(time){
    store.dispatch(storeExpireTime(time));
}

export function setPassword(pwd){
    store.dispatch(storePassword(pwd));
}

export function setRedirection(url){
    store.dispatch(storeRedirection(url));
}

export function getLevel(){
    return store.getState().level;
}

export function getName(){
    return store.getState().name;
}

export function getUserName(){
    return store.getState().username;
}

export function getTrustId(){
    return store.getState().trustId;
}

export function getHospitalId(){
    return store.getState().hospitalId;
}

export function getExpireTime(){
    return store.getState().expireTime;
}

export function getPassword(){
    return store.getState().password;
}

export function getRedirection(){
    return store.getState().redirection;
}