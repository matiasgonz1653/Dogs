import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../actions";
import { Link } from "react-router-dom";
import Dogs from "./dog";


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperament);

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }


    return (
        <div>
            <Link to="/dogs">Crear DOG</Link>
            <h1>perritos lindos</h1>
            <button onClick={e=>{handleClick(e)}}>
                volver a cargar los perros
            </button>
            <div>
                <select>
                    <option disabled selected>Orden Alfabetico</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>

                <select>
                    <option disabled selected>Filtrado por peso</option>
                    <option value="min_weight">Minimo</option>
                    <option value="max_weight">Maximo</option>
                </select>
                <select>
                    <option value="All">Todos</option>
                    <option value="Create">Creados</option>
                    <option value="api">Existentes</option>
                </select>

                <div>
                    {
                        allDogs && allDogs.map(d => {
                            return (
                                <Dogs
                                id={d.ID}
                                name={d.name}
                                temperament={d.temperament}
                                image={d.image}
                                weight={d.weight}
                                height={d.height}
                                ></Dogs>
                            )
                    })
                }
                </div>
            </div>
        </div>
    )
}