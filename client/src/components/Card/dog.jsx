import React from "react";
import { Link } from "react-router-dom";

export default function Card({ image, name, temperament, weight, height , id }) {
    
    let temp = "";
    typeof temperament === "object" ?
        temp = temperament.map(t => {
            return t.name
        }).join(", ") : temperament = temperament
    
    return (
        <div>
            <h2>{name}</h2>
            <h4>{`Peso ${weight[0]} - ${weight[1]} Kg`}</h4>
            <h4>{`Tamaño ${height[0]} - ${height[1]} Cm`}</h4>
            <h3>{temp?temp:temperament}</h3>
            <Link to={`/home/${id}`}>
            <img src={image} alt="la imagen no funciona" whidth="200px" height="250px"></img>
            </Link>
        </div>
    );
}