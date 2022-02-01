const expireTimeReducer = (state=-1,action)=>{
    switch(action.type){
        case 'GET_EXPIRETIME':
            return state;
        case 'SET_EXPIRETIME':
            return state = action.data;
        default:
            return state;
    }
}

export default expireTimeReducer;