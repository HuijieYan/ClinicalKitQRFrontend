const selectionReducer = (state=[],action)=>{
    switch(action.type){
        case 'GET_SELECTION':
            return state;
        case 'SET_SELECTION':
            return state = action.data;
        case 'PUSH_SELECTION':
            return state.push(action.data);
        default:
            return state;
    }
}

export default selectionReducer;