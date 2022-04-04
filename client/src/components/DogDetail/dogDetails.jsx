import React, {useState} from "react";
import { useEffect } from "react";
import {useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index";
import { Link } from "react-router-dom";
//import LoadingScreen from "../LoadingScreen/Loading";

export default function DogDetail() {
    
    const dispatch = useDispatch()
    const {id} = useParams()
    
    
    useEffect(() => {
        dispatch(getDetail(id))
    }, [])
    
    const selectedDog = useSelector((state) => state.dogs)

    let temp = "";
    typeof selectedDog[0].temperament === "object"
        ? temp = selectedDog[0].temperament.map(t => {
            return t.name
        }).join(", ") : selectedDog[0].temperament = selectedDog[0].temperament
    
    
    return (
        <div>
            {
                <div className="card-container">
                    <div className="wallpaper">
                    <Link to='/home'>
                        <button>Volver</button>
                    </Link>
                    <h1 className="name">{selectedDog[0].name}</h1>
                    <img src ={selectedDog[0].image} alt="" width="800px" height="600px" className="pcture"/>
                    <h2 className="temperameents">Temperaments: {selectedDog[0].createdAtDb ? temp : selectedDog[0].temperament }.</h2>
                    <h3 className="wight">weight: {selectedDog[0].weight} kg</h3>
                    <h3 className="height">Height: {selectedDog[0].height} cm</h3>
                    <h4 className="lifeSpan">life span: {selectedDog.createdAtDb ? selectedDog[0].lifeSpan + "years" : selectedDog[0].lifeSpan} </h4>
                    </div>
                </div>
            }
        </div>
    )
}