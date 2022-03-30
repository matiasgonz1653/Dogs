
const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    detail: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {

        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;