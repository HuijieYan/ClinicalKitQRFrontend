const usernameReducer = (state="",action)=>{
    switch(action.type){
        case 'GET_USERNAME':
            return state;
        case 'SET_USERNAME':
            return state = action.data;
        default:
            return state;
    }
}

export default usernameReducer;