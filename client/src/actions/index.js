import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DETAIL = "GET_DETAIL";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_NAME = "GET_DOG_NAME";
export const POST_DOG = "POST_DOG";
export const ORDER_BY_ALPHABETICAL = "ORDER_BY_ALPHABETICAL";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const FILTER_DOGS_BY_TEMPERAMENT = "FILTER_DOGS_BY_TEMPERAMENT";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";



export function getDogs() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs");
            return dispatch({
                type: "GET_DOGS",
                payload: json.data,
            })    
        } catch (error) {
            alert("conection failed");
        }
    }
}

export function getDetail(payload) {
    return async function (dispatch){
    try {
        var json = await axios.get(`http://localhost:3001/dogs/${payload}`)
        console.log(json.data)
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        });
    } catch (error) {
        alert("error al buscar perro por ID")
    }}
}

export function getDogName(name) {
    console.log(name)
    return async function (dispatch) {
        try {
            var resp = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_DOG_NAME,
                payload: resp.data
            })
        } catch (error) {
            alert("Error al buscar perro")
        }
    }
}

export function getDogTemperament() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/temperament");
            return dispatch({
                type: "GET_TEMPERAMENTS",
                payload: json.data
            })    
        } catch (error) {
            alert("error al buscar Temperamentos")
        }
    }
}


export function postDog (payload) {
    return async function(dispatch){
        try{
            await axios.post('http://localhost:3001/dog', payload);
            return {
                type: POST_DOG,
            }
        } 
        catch(error){
            alert("Post failed")
        }
    } 
} 


export function orderAlphabetical(payload) {
    return {
        type: ORDER_BY_ALPHABETICAL,
        payload
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_DOGS_BY_TEMPERAMENT,
        payload
    }
}

export function orderWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export function filterDogsByCreated (payload) {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}


