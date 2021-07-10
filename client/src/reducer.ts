
//initital sate of the user
export const initialState = {
    user: null
}

function reducer(state: any, action: { type: string; user: any; }){

    if(action.type === "USER")
        return { ...state, user: action.user}

    return state
}
export default reducer;