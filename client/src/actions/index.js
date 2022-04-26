import axios from "axios";
import { baseUrl } from "../utils";
import {
    GET_DOGS,
    GET_DETAIL,
    GET_TEMPERAMENTS,
    GET_DOG_NAME,
    POST_DOG,
    ORDER,
    //ORDER_BY_ALPHABETICAL,
    //ORDER_BY_WEIGHT,
    FILTER_DOGS_BY_TEMPERAMENT,
    FILTER_BY_CREATED
} from "./action"


export function getDogs() {
    return async function (dispatch) {
        try {
            var json = await axios.get(`${baseUrl}/dogs`);
            return dispatch({
                type: GET_DOGS,
                payload: json.data,
            })
        } catch (error) {
            alert("conection failed");
        }
    }
}

export function getDetail(id) {
    return async function (dispatch){
    try {
        var json = await axios.get(`${baseUrl}/dogs/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        });
    } catch (error) {
        alert("error al buscar perro por ID")
    }}
}

export function getDogName(name) {
    return async function (dispatch) {
        try {
            var resp = await axios.get(`${baseUrl}/dogs?name=${name}`)
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
            var json = await axios.get(`${baseUrl}/temperament`);
            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: json.data
            })    
        } catch (error) {
            alert("error al buscar Temperamentos")
        }
    }
}


export function postDog (payload) {
    return async function(){
        try{
            await axios.post(`${baseUrl}/dog`, payload);
            return {
                type: POST_DOG,
            }
        } 
        catch(error){
            alert("Post failed")
        }
    } 
} 

export function order(payload) {
    return {
        type: ORDER,
        payload
    }
}

/* export function orderAlphabetical(payload) {
    return {
        type: ORDER_BY_ALPHABETICAL,
        payload
    }
} */

export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_DOGS_BY_TEMPERAMENT,
        payload
    }
}

/* export function orderWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
} */

export function filterDogsByCreated (payload) {
    return {
        type: FILTER_BY_CREATED,
        payload
    }
}


