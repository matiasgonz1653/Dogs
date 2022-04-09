import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index";
import { Link } from "react-router-dom";
import img from "../img/back.png"
import "./dogDetails.css"
import cargando from "../img/piq-loading.gif"


export default function DogDetail() {
    const dispatch = useDispatch()
    const {id} = useParams()
    
    useEffect(() => {
        dispatch(getDetail(id));
    },[dispatch,id])
    
    const selectedDog = useSelector((state) => state.dogs)
    
    return (
        <div className="walpaperDetalle">
            {selectedDog.length > 0 ? (
                <div className="card-contenedor">
                    <div className="card-content">
                        <Link to='/home'>
                            <img
                                src={img}
                                alt=""
                                className="imgBackDetail"
                            />
                        </Link>
                        <h1 className="name">{selectedDog[0].name}</h1>
                        <div className="wightHeight">
                            <h3 className="wightHeightLifeSpan">Peso: {`${selectedDog[0].weight[0]} - ${selectedDog[0].weight[1]}`} kg</h3>
                            <h3 className="wightHeightLifeSpan">Tamaño: {`${selectedDog[0].height[0]} - ${selectedDog[0].height[1]}`} cm</h3>
                        </div>
                        <h3 className="wightHeightLifeSpan">
                            Esperanza de vida: {
                                selectedDog[0].lifeSpan[0]===selectedDog[0].lifeSpan[1]?
                                    (`${selectedDog[0].lifeSpan[0]} - NaN años`) :
                                    (`${selectedDog[0].lifeSpan[0]} - ${selectedDog[0].lifeSpan[1]} años`)
                            } </h3>
                        <h2 className="temperamentDetalle">Temperamentos: {
                            selectedDog[0].createdAtDb
                                ? selectedDog[0].temperament.map(t => { return t.name }).join(", ")
                                : selectedDog[0].temperament
                        }.</h2>
                        <div className="divImgDetail">
                        <img
                            src={selectedDog[0].image}
                            alt=""
                            className="pictureDetalle"
                        />
                        </div>
                    </div>
                </div>) : (
                <div>
                <img
                    src={cargando}
                    alt="cargando..."
                    className="cargando"
                    />
                    <Link to="/home">
                        <button className="volver">Volver a Pantalla anterior </button>
                    </Link>
                </div>
                )
            }
        </div>
    )
}