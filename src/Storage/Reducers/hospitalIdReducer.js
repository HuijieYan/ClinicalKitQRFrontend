const hospitalIdReducer = (state=-1,action)=>{
    switch(action.type){
        case 'GET_HOSPITALID':
            return state;
        case 'SET_HOSPITALID':
            return state = action.data;
        default:
            return state;
    }
}

export default hospitalIdReducer;