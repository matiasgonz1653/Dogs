import {
    ORDER_BY_ALPHABETICAL,
    ORDER_BY_WEIGHT,
    FILTER_BY_CREATED,
    FILTER_DOGS_BY_TEMPERAMENT,
    GET_DETAIL,
    GET_DOGS,
    GET_DOG_NAME,
    GET_TEMPERAMENTS,
    POST_DOG,
} from "../actions/index"

const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: []
}


function rootReducer(state = initialState, action) {
    
    switch (action.type) {

        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }


        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }


        case GET_DOG_NAME:
            return {
                ...state,
                dogs: action.payload
            }


        case GET_DETAIL:
            return {
                ...state,
                dogs : action.payload
            }


        case POST_DOG:
            return {
                ...state
            }


        case ORDER_BY_ALPHABETICAL:
            if (action.payload === "default"){
                return {
                    ...state,
                    dogs: state.allDogs
                }
            }
            if (action.payload === "Asc") {
                return {
                    ...state,
                    dogs: state.dogs.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0
                    }) 
                }
            }
            if (action.payload === "Des"){
                return{
                    ...state,
                    dogs: state.dogs.sort (function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0;
                    })
                }
            }


        case ORDER_BY_WEIGHT:
            console.log(action)
            if (action.payload === "default") {
                return {
                    ...state,
                    dogs: state.allDogs
                }
            }
            if (action.payload === "min_weight") {
                return {
                    ...state,
                    dogs: state.dogs.sort((a, b) => {
                        if (parseInt(a.weight[0]) > parseInt(b.weight[0])) {
                            return 1;
                        }
                        if (parseInt(b.weight[0]) > parseInt(a.weight[0])) {
                            return -1;
                        }
                        return 0;
                    })
                }
            }
            if (action.payload === "max_weight") {
                return {
                    ...state,
                    dogs: state.dogs.sort((a, b) => {
                        if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                            return -1;
                        }
                        if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                            return 1;
                        }
                        return 0;
                    })
                }
            }


        case FILTER_DOGS_BY_TEMPERAMENT:
            console.log(action)
            const dogs = state.allDogs;
            dogs.map((dog) => {
                typeof dog.temperament === "object"
                    ? dog.temperament = dog.temperament.map(t => { return t.name })
                        .join(", ")
                    : dog.temperament = dog.temperament
            })
            const temperamentFilter =
                action.payload === 'All' ? state.allDogs
                    : dogs.filter((e)=>
                        e.temperament?.includes(action.payload))              
            return {
                ...state,
                dogs: temperamentFilter,
            }


        case FILTER_BY_CREATED:
            console.log(action)
            const Dogs = state.allDogs;
            const createdFilter = (
                action.payload === "All" ? state.allDogs :
                Dogs.filter((e) => {
                        if (action.payload==="Create") {
                            if (e.createdAtDb) {
                                return e;
                            }
                        } else if(action.payload==="Api"){
                            if (!e.createdAtDb) {
                                return e;
                            }
                        }
                })
            );
            return {
                ...state,
                dogs:createdFilter
            }
        default:
            return state;
    }
}

export default rootReducer;