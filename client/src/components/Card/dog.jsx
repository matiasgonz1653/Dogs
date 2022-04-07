import React from "react";
import { Link } from "react-router-dom";
import "./dog.css"

export default function Card({ image, name, temperament, weight, height , id }) {
    
    let temp = "";
    typeof temperament === "object" ?
        temp = temperament.map(t => {
            return t.name
        }).join(", ") : temperament = temperament
    
    return (
        <div className="card-container">
            <Link to={`/home/${id}`}>
            <h2 className="nameHome">{name}</h2>
            <h4 className="weightHome">{`Peso ${weight[0]} - ${weight[1]} Kg`}</h4>
            {/* <h4>{`Tamaño ${height[0]} - ${height[1]} Cm`}</h4> */}
            <h3 className="temperamentsHome">Temperamentos: </h3>
            <h3 className="temperamentsHome">{temp?temp:temperament}</h3>
            <div className="image-conteiner">
                <img
                    src={image}
                    alt="la imagen no funciona"
                    whidth="200px" height="250px"
                    className="image"
                ></img>
            </div>
            </Link>
        </div>
    );
}