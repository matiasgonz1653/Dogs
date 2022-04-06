import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css"

export default function LandingPage() {
    return(
        <div className="background">
            <h1 className="welcomeText"> Bienvenido a la App de perros! :D </h1>
            <Link to ="/home">
            <button className="button">Ingresar</button>
            </Link>
        </div>
    )
}