const levelReducer = (state=-1,action)=>{
    switch(action.type){
        case 'GET_LEVEL':
            return state;
        case 'SET_LEVEL':
            return state = action.data;
        default:
            return state;
    }
}

export default levelReducer;