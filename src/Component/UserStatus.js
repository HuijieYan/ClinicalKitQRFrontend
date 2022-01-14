import { storeHospitalId, storeLevel, storeName, storeTrustId } from "../Storage/Actions/actions";
import { store } from "../Storage/storeConfiguration";



export function setName(name){
    console.log(name);
    store.dispatch(storeName(name));
}

export function setLevel(level){
    store.dispatch(storeLevel(level));
}

export function setTrustID(id){
    console.log(id);
    store.dispatch(storeTrustId(id));
}

export function setHospitalID(id){
    console.log(id);
    store.dispatch(storeHospitalId(id));
}

export function getLevel(){
    return store.getState().level;
}

export function getName(){
    return store.getState().name;
}

export function getTrustId(){
    return store.getState().trustId;
}

export function getHospitalId(){
    return store.getState().hospitalId;
}