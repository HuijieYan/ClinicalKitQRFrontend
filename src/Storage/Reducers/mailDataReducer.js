const mailDataReducer = (state=[],action)=>{
    switch(action.type){
        case 'GET_MAILDATA':
            return state;
        case 'SET_MAILDATA':
            return state = action.data;
        default:
            return state;
    }
}

export default mailDataReducer;