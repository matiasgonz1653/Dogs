import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments ,filterTemperamets, filterWeight, filterAlphabetical, filterCreated} from "../actions";
import { Link } from "react-router-dom";
import Dogs from "./dog";
import Paginado from "./pagination"
import TemperamentsSelect from "./temperamentSelect";


export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperament);


    const [orden, setOrden] = useState("")
    const [currentPage, setcurrentPage] = useState(1)
    const [dogsOnPage, setDogs] = useState(8)
    const indexLastDog = currentPage * dogsOnPage;
    const indexFristDog = indexLastDog - dogsOnPage;
    const currentDog = allDogs.slice(indexFristDog, indexLastDog);

    const paginado = (pageNumber) => {
        setcurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    },[]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }


    function handleFilterByTemperament(e) {
        e.preventDefault();
        dispatch(filterTemperamets(e.target.value))
    }

    function handleFilterByWeight(e) {
        e.preventDefault();
        dispatch(filterWeight(e.target.value))
    }

    function handleFilterByAlphabetical(e) {
        e.preventDefault();
        dispatch(filterAlphabetical(e.target.value));
        setcurrentPage(1);
        setOrden(`${ e.target.value }`);
    }

    function handleFilterCreate(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setcurrentPage(1);
    }


    return (
        <div>
            <Link to="/dogs">Crear DOG</Link>
            <h1>perritos lindos</h1>
            <button onClick={e=>{handleClick(e)}}>
                volver a cargar los perros
            </button>
            <div>
                <select onChange={e=>handleFilterByAlphabetical(e)}>
                    <option disabled selected>Orden Alfabetico</option>
                    <option value="Asc">A-Z</option>
                    <option value="Des">Z-A</option>
                </select>

                <select onClick={e=>handleFilterByWeight(e)}>
                    <option disabled selected>Filtrado por peso</option>
                    <option value="min_weight">Minimo</option>
                    <option value="max_weight">Maximo</option>
                </select>

                <select onClick={e=>handleFilterCreate(e)}>
                    <option value="All">Todos</option>
                    <option value="Create">Creados</option>
                    <option value="api">Existentes</option>
                </select>

                {/*  <TemperamentsSelect
                    allTemperaments={allTemperaments}
                    handleFilterByTemperament={handleFilterByTemperament}
                /> */}

                <Paginado
                    dogsOnPage={dogsOnPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />
                <div>
                {
                    currentDog?.map(d => {
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