const redirectionReducer = (state="",action)=>{
    switch(action.type){
        case 'GET_REDIRECTION':
            return state;
        case 'SET_REDIRECTION':
            return state = action.data;
        default:
            return state;
    }
}

export default redirectionReducer;