
//initital sate of the user
export const initialState = {
    user: null
}

//set to the login user
function reducer(state, action){

    if(action.type === "USER")
        return { ...state, user: action.user}

    return state
}
export default reducer;