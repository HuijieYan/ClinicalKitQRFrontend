const passwordReducer = (state="",action)=>{
    switch(action.type){
        case 'GET_PASSWORD':
            return state;
        case 'SET_PASSWORD':
            return state = action.data;
        default:
            return state;
    }
}

export default passwordReducer;