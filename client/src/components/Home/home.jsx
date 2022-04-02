import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Dog/dog";
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
    },[]);


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
        <div>
            <Link to="/home/createDog">Crear DOG</Link>
            <h1>perritos lindos</h1>
            
            <div>

                <select onChange={(e)=>handleOrderByAlphabetical(e)}>
                    <option value="default">Orden Alfabetico</option>
                    <option value="Asc">A-Z</option>
                    <option value="Des">Z-A</option>
                </select>

                <select onChange={e=>handleOrderByWeight(e)}>
                    <option value="default">Filtrado por peso</option>
                    <option value="min_weight">Minimo</option>
                    <option value="max_weight">Maximo</option>
                </select>

                <select onChange={(e) => handleFilterDogsByTemperament(e)}>
                    <option value="All">temperamentos</option>
                    {allTemperaments.map((temperament) => (
                        <option value={temperament}>{temperament}</option>
                    ))}
                </select>

                <select onChange={(e)=>handleFilterCreate(e)}>
                    <option value="All">Todos</option>
                    <option value="Create">Creados</option>
                    <option value="Api">Existentes</option>
                </select>

                <Paginado
                    dogsOnPage={dogsOnPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />

                <SearchBar/>

                <div>
                {
                    currentDog?.map(d => {
                        return (
                            <Card
                                id={d.ID}
                                name={d.name}
                                temperament={d.temperament}
                                temperaments={d.temperaments}
                                image={d.image?d.image:d.image}
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