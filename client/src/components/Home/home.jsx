import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/dog";
import Paginado from "../Pagination/pagination"
import SearchBar from "../SearchBar/searchBar";
import {
    getDogs,
    getDogTemperament,
    filterDogsByTemperament,
    filterDogsByCreated,
    orderWeight,
    orderAlphabetical,
} from "../../actions/index";
import "./home.css"
import reload from "../img/reload.png"

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs); //reducer
    const allTemperaments = useSelector((state) => state.temperaments);
    const [orden, setOrden] = useState("")


    const [currentPage, setCurrentPage] = useState(1)
    const [dogsOnPage, setDogsOnPage] = useState(8)
    const indexLastDog = currentPage * dogsOnPage;
    const indexFristDog = indexLastDog - dogsOnPage;
    
    const currentDog = allDogs.slice(indexFristDog, indexLastDog);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getDogs());
        dispatch(getDogTemperament());
    },[dispatch]);

    function handleRefresh() {
        window.location.reload(false);
    }

    function handleOrderByAlphabetical(e) {
        e.preventDefault();
        dispatch(orderAlphabetical(e.target.value));
        setCurrentPage(1);
        setOrden(`${ e.target.value }`);
    }

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`${ e.target.value }`);
    }

    function handleFilterDogsByTemperament(e) {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value));
        setCurrentPage(1);
        setOrden(`${ e.target.value }`);
    }

    function handleFilterCreate(e) {
        e.preventDefault();
        dispatch(filterDogsByCreated(e.target.value));
        setCurrentPage(1);
        setOrden(`${ e.target.value }`);
    }
    
    
    return (
        <div className="home">
            <Link to="/home/createDog">Crear DOG</Link>
            <h1>perritos lindos</h1>
            <button
                type="submit"
                onClick={handleRefresh}
                className="refresh"
                >
            <img
                width="20px" height="20px"
                className="icon"
                src={reload}
                alt="">
            </img>
            </button>

            <div className="lists">

                <SearchBar />

                <select onChange={(e)=>handleOrderByAlphabetical(e)} className="listAlpha">
                    <option value="default">Orden Alfabetico</option>
                    <option value="Asc">A-Z</option>
                    <option value="Des">Z-A</option>
                </select>

                <select onChange={e=>handleOrderByWeight(e)} className="listAlpha">
                    <option value="default">Ordenado por peso</option>
                    <option value="min_weight">Minimo</option>
                    <option value="max_weight">Maximo</option>
                </select>

                <select onChange={(e) => handleFilterDogsByTemperament(e)} className="listAlpha">
                    <option value="All">temperamentos</option>
                    {allTemperaments.map((temperament) => (
                        <option value={temperament}>{temperament}</option>
                    ))}
                </select>

                <select onChange={(e)=>handleFilterCreate(e)} className="listAlpha">
                    <option value="All">Todos</option>
                    <option value="Create">Creados</option>
                    <option value="Api">Existentes</option>
                </select>

                <Paginado
                    dogsOnPage={dogsOnPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />


                <div className="positions">
                {
                    currentDog?.map(d => {
                        return (
                            <Card
                                id={d.id}
                                name={d.name}
                                temperament={d.temperament}
                                image={d.image}
                                weight={d.weight}
                                height={d.height}
                            ></Card>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )

}