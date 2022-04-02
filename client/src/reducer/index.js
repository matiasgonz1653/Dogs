
const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
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
        
        case 'FILTER_DOGS_BY_TEMPERAMENT':
            const allDogs3 = state.dogsAll
            const tempDogs = allDogs3.filter(dog => {
                if(dog.temperaments){
                    const temperament = dog.temperaments.map( dog => dog.name)
                    return temperament.includes(action.payload)}
                if (dog.temperament) { 
                    return dog.temperament.includes(action.payload)
                }
                return null
            })

            return {
                ...state,
                dogs: action.payload === 'Temps' ? allDogs3 : tempDogs,

            }
        
        case "FILTER_BY_WEIGHT":
                const sortedWeight = action.payload === "min_weight" ? 
                    state.allDogs.sort((a, b) => {
                        if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                            return 1;
                        }
                        if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                            return -1;
                        }
                        return 0;
                    }) :
                    state.allDogs.sort((a, b) => {
                        if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                            return -1;
                        }
                        if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                            return 1;
                        }
                        return 0;
                    })
                return {
                    ...state,
                    dogs: sortedWeight
            }
        
        case "ORDER_BY_NAME":
            const dogsSorted = action.payload === "Asc"
                ? state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                    })
                : state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                    });
            return {
                ...state,
                dogs: dogsSorted,
            };

        case "FILTER_BY_CREATE":
            const Dogs = state.allDogs;
            const createdFilter = (
                action.payload === "All" ? Dogs :
                Dogs.filter((e) => {
                        if (action.payload==="Create") {
                            if (e.createdAtDb) {
                                return e;
                            }
                        } else if(action.payload==="api"){
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
        
        case "GET_DOG_NAME":
            return {
                ...state,
                dogs: action.payload
            }
        
        default:
            return state;
    }
}

export default rootReducer;