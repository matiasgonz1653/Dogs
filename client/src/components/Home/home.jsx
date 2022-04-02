import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Dog/dog";
import Paginado from "../Pagination/pagination"
import SearchBar from "../SearchBar/searchBar";
//import TemperamentSelect from "./temperamentSelect";
import {
    getDogs,
    getDogTemperament,
    filterDogsByTemperament,
    filterWeight,
    filterAlphabetical,
    filterDogsByCreated
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

    function handleClickVolverACargar(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleFilterDogsByTemperament(e) {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value));
    }
    

    function handleFilterByWeight(e) {
        e.preventDefault();
        dispatch(filterWeight(e.target.value))
    }

    function handleFilterByAlphabetical(e) {
        e.preventDefault();
        dispatch(filterAlphabetical(e.target.value));
        setCurrentPage(1);
        setOrden(`${ e.target.value }`);
    }

    function handleFilterCreate(e) {
        e.preventDefault();
        dispatch(filterDogsByCreated(e.target.value));
        setCurrentPage(1);
    }


    return (
        <div>
            <Link to="/dog">Crear DOG</Link>
            <h1>perritos lindos</h1>
            <button onClick={e=>{handleClickVolverACargar(e)}}>
                volver a cargar los perros
            </button>
            <div>
                <select onChange={e=>handleFilterByAlphabetical(e)}>
                    <option disabled selected>Orden Alfabetico</option>
                    <option value="Asc">A-Z</option>
                    <option value="Des">Z-A</option>
                </select>

                <select onChange={e=>handleFilterByWeight(e)}>
                    <option disabled selected>Filtrado por peso</option>
                    <option value="min_weight">Minimo</option>
                    <option value="max_weight">Maximo</option>
                </select>

                <select onChange={e=>filterDogsByCreated(e)}>
                    <option value="All">Todos</option>
                    <option value="Create">Creados</option>
                    <option value="api">Existentes</option>
                </select>

                <select onChange={(e) => handleFilterDogsByTemperament(e)}>
                    <option hidden>Dog's temperaments</option>
                    {allTemperaments.map((temperament) => (
                        <option value={temperament}>{temperament}</option>
                    ))}
                </select>
                

                {/* <select onChange={(e)=> handleFilterDogsByTemperament(e)}>
                    <option value="Temps">Temperaments</option>
                        {allTemperaments.map((temp) => (
                            <option value={temp}>{temp}</option>
                        ))}
                </select> */}
                
                {/* <select onChange={e=>handleFilterByTemperament(e)}>
                    <option disabled selected>Temperaments</option>
                    <option value="Todos">All</option>
                    {allTemperaments.map(t => (
                        <option value={t}>{t}</option>
                    ))}
                </select> */}

                <Paginado
                    dogsOnPage={dogsOnPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />
                <SearchBar placeholder = "busca a tu doge!" />
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