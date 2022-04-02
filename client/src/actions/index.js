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

export const getDetail = (id) => (dispatch) => {
    return fetch(`http://localhost:3001/dogs/${id}`)
    .then ((response) => response.json())
    .then ((json) => {
        dispatch ({
            type: "GET_DETAIL",
            payload: json
        })
    })
}

export function getDogTemperament() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/temperament");
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data
        })
    }
}

export function getDogName(name) {
    return async function (dispatch) {
        try {
            var resp = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: "GET_DOG_NAME",
                payload: resp.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const postDog = (payload) => () => {
    return fetch("http://localhost:3001/dog", {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
    })
}


export function filterDogsByTemperament(paylod) {
    return {
        type: "FILTER_DOGS_BY_TEMPERAMENT",
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

export function filterDogsByCreated (payload) {
    return {
        type: "FILTER_BY_CREATED",
        payload
    }
}


