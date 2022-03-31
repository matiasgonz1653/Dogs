import axios from "axios";

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: "GET_DOGS",
            payload: json.data,
        })
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data
        })
    }
}


export function filterTemperamets(paylod) {
    return {
        type: "FILTER_BY_TEMPERAMET",
        paylod
    }
}

export function filterWeight(paylod) {
    return {
        type: "FILTER_BY_WEIGHT",
        paylod
    }
}

export function filterAlphabetical(paylod) {
    return {
        type: "ORDER_BY_NAME",
        paylod
    }
}

export function filterCreated(payload) {
    
}