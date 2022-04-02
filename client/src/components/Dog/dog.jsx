import React from "react";

export default function Card({ image, name, temperament, weight, height , id }) {
    return (
        <div>
            <h2>{name}</h2>
            <h4>{id}</h4>
            <h4>{` Peso ${weight[0]} - ${weight[1]} Kg`}</h4>
            <h4>{` Tamaño ${height[0]} - ${height[1]} Cm`}</h4>
            <h3>{temperament}</h3>
            <img src={image} alt="la imagen no funciona" whidth="200px" height="250px"></img>
        </div>
    );
}