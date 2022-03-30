import React from "react";

export default function Card({ image, name, temperament, weight, height , id }) {
    return (
        <div>
            <h3>{name}</h3>
            <h2>{id}</h2>
            <h2>{weight}</h2>
            <h2>{height}</h2>
            <h2>{temperament}</h2>
            <img src={image} alt="la imagen no funciona" whidth="200px" height="250px"></img>
        </div>
    );
}