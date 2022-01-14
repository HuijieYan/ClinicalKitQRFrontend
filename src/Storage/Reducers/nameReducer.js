const nameReducer = (state="",action)=>{
    switch(action.type){
        case 'GET_NAME':
            return state;
        case 'SET_NAME':
            return state = action.data;
        default:
            return state;
    }
}

export default nameReducer;