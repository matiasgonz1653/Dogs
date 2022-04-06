import React from "react";
import gif from "../img/gif.gif";
import "./Loading.css"

export default function LoadingScreen({setLoading}) {
    return (
        <>
        <div className="loading" />
        <div className="imgGif">
            <img src={gif} alt=""/>
        </div>
        <div className="numerito">
        {setTimeout(() => {
            setLoading(false);
        }, 2000)}
        </div>
        </>
    );
};