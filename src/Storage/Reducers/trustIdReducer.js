const trustIdReducer = (state=-1,action)=>{
    switch(action.type){
        case 'GET_TRUSTID':
            return state;
        case 'SET_TRUSTID':
            return state = action.data;
        default:
            return state;
    }
}

export default trustIdReducer;