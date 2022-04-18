import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {getDogTemperament, postDog} from "../../actions/index"
import icon from "../img/reload.png"
import remove from "../img/remove.png"
import iconHome from "../img/home1.png"
import "./dogCreation.css"

const validate = function(input){
    let errors = {}
    
    if (!input.name){
        errors.name = "Ingresar un Nombre a la raza de perros"
    }
    if (!input.name.match(/^[A-Za-z\s]+$/)){
        errors.name = "El nombre debe contener unicamente letras"
    }
    if  (!input.minimWeight) {
        errors.minimWeight = "Ingresa un valor para el peso minimo de la raza"
    }
    if (!input.maximWeight) {
        errors.maximWeight = "Ingresa un valor para el peso maximo de la raza"
    }
    if (!input.minimHeight) {
        errors.minimHeight = "Ingresa un valor para el tamaño minimo de la raza "
    }
    if (!input.maximHeight) {
        errors.maximHeight = "Ingresa un valor para el tamaño maximo de la raza "
    }
    
    if (parseInt(input.minimHeight) <= 10){
        errors.minimHeight = "El tamaño minimo debe de ser mayor a 10cm" 
    }
    if (parseInt(input.maximWeight) <= 2){
        errors.maximWeight = "El peso maximo no puede ser menor a 2Kg" 
    }
    if (parseInt(input.minLifeSpan) < 0) {
        errors.minLifeSpan = "La esperanza de vida debe de ser mayor a 1 año"
    }
    if (parseInt(input.maxLifeSpan) > 21){
        errors.maxLifeSpan = "Ingresar una esperaza de vida razonable (menos a 21 años)"
    }
    if (parseInt(input.image) > 250){
        errors.maxLifeSpan = "el link de la imagen es demaciado grande"
    }
    if (parseInt(input.minLifeSpan) > parseInt(input.maxLifeSpan)){
        errors.minLifeSpan = "La esperanza de vida Minima es mayor a su maxima"
    }
    if (parseInt(input.minimWeight) > parseInt(input.maximWeight)){
        errors.minimWeight = "El peso Minimo es mayor a su peso maximo"
    }
    if (parseInt(input.minimHeight) > parseInt(input.maximHeight)){
        errors.minimHeight = "El Tamaño Minimo es mayor a su tamaño maximo"
    }
    return errors
}

export default function DogCreate(){ 
    const dispatch = useDispatch()
    const temperament = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})
    
    temperament.sort(function (a, b) {
        if (a > b) {
            return 1;
        }
        if (b > a) {
            return -1
        }
        return 0;
    })

    useEffect(() => {
        dispatch(getDogTemperament())
    }, [dispatch]);
    
    const [input, setInput] = useState({
        name: "",
        minimHeight: "", 
        maximHeight: "",
        minimWeight: "",
        maximWeight: "",
        maxLifeSpan: "",
        minLifeSpan: "",
        image: "",
        temperament: []
    })

    console.log(input)
    
    function refreshPage() {
        window.location.reload(false);
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament : [...input.temperament, e.target.value]
        })
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(el => el !== e)
        })
    }

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
        const errorSaver = validate(input)
        if(Object.values(errorSaver).length !== 0 ) {
            alert("Error, Completa los campos con valores que cumplan las condiciones para crear tu raza de perro")
        } else {
            dispatch(postDog(input))
            navigate("/home")
            alert("Perro creado")
            setInput({
                name: "",
                minimHeight: "", 
                maximHeight: "",
                minimWeight: "",
                maximWeight: "",
                maxLifeSpan: "",
                minLifeSpan: "",
                image: "",
                temperament: []
        })
        }
    }


    return(
        <div className="fondo">

            <div className="titleRefreshHome">
            <button
                type="submit"
                onClick={refreshPage}
                className="buttonRefresh">
			    <img
                    className="iconRefresh"
                        src={icon}
                        width="35px"
                    alt="">
                </img>
            </button>
            
            <div className="homeButton">
                <Link
                    to="/home"
                    className="linkHome"
                    >
                        <img
                        src={iconHome}
                            alt=""
                            width="35px"
                        className="iconHome"
                    />
                    ⬅ Home
                </Link>
            </div>
            
            <h1 className="tituleCrear">Crea tu raza</h1> 

            </div>

            <div className="card-containers">

                <div className="containers">

                    <div className="breed">
                        <label>Nombre raza</label>
                        <input className="inputs"
                        type= "text"
                        value= {input.name = input.name.substring(0, 1).toUpperCase() + input.name.substring(1)}
                        name="name"
                        placeholder="Breed's name"
                        onChange={(e) => handleChange(e)}/>
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="minHeight">
                        <label>Tamaño Minimo</label>
                        <input className="inputs"
                        type= "number"
                        min="1"
                        max="99"
                        value= {input.minimHeight}
                        name="minimHeight"
                        placeholder="Minimal height"
                        onChange={(e) => handleChange(e)}/>
                        {errors.minimHeight && 
                            <p className="error">{errors.minimHeight}</p>}
                    </div>

                    <div className="maxHeight">
                        <label>Tamaño maximo</label>
                        <input className="inputs"
                        type= "number"
                        min="1"
                        max="99"
                        value= {input.maximHeight}
                        name="maximHeight"
                        placeholder="Maximal height"
                        onChange={(e) => handleChange(e)}/>
                        {errors.maximHeight && 
                            <p className="error">{errors.maximHeight}</p>}
                    </div>

                    <div className="minWeight">
                        <label>peso Minimo</label>
                        <input className="inputs"
                        type="number"
                        min="1"
                        max="99"
                        value= {input.minimWeight}
                        name="minimWeight"
                        placeholder="Minimal weight"
                        onChange={(e) => handleChange(e)}/>
                        {errors.minimWeight && 
                            <p className="error">{errors.minimWeight}</p>}
                    </div>

                    <div className="maxWeight">
                        <label>Peso maximo</label>
                        <input className="inputs"
                        type="number"
                        min="1"
                        max="99"
                        value= {input.maximWeight}
                        name="maximWeight"
                        placeholder="Maximal weight"
                        onChange={(e) => handleChange(e)}/>
                        {errors.maximWeight &&
                            <p className="error">{errors.maximWeight}</p>}
                    </div>

                    <div className="minLifeSpan">
                        <label>Esperanza de vida Minima</label>
                        <input className="inputs"
                        type="number"
                        min="1"
                        max="21"
                        value= {input.minLifeSpan}
                        name="minLifeSpan"
                        placeholder="Breed's life span"
                        onChange={(e) => handleChange(e)}/> 
                        {errors.minLifeSpan &&
                        <label className="error">{errors.minLifeSpan}</label>}
                    </div>

                    <div className="maxLifeSpan">
                        <label>Esperanza de vida Maxima</label>
                        <input className="inputs"
                        type="number"
                        min="1"
                        max="21"
                        value= {input.maxLifeSpan}
                        name="maxLifeSpan"
                        placeholder="Breed's life span"
                        onChange={(e) => handleChange(e)}/> 
                        {errors.maxLifeSpan &&
                        <label className="error">{errors.maxLifeSpan}</label>}
                    </div>

                    <div className="picture">
                        <label>Imagen</label>
                        <input className="inputs"
                        type="text"
                        value= {input.image}
                        name="image"
                        placeholder="Picture URL..."
                        onChange={(e) => handleChange(e)}/>
                    </div>
                </div>


                    <div>
                    <select onChange={(e) => handleSelect(e)}  className="listTemps">
                        <option hidden>Temperamentos del perro</option>
                        {temperament.map((temperament) => (
                            <option
                                key={temperament}
                                value={temperament}
                            >{temperament}</option>
                        ))}
                    </select>
                    </div>

                    <div className="temperamentsItems">
                    {input.temperament.map(el =>
                        <p
                            key={el}
                            className="itemsTemperaments">
                                {el}
                                <button
                                    className="buttonRemove"
                                    onClick={() => handleDelete(el)}
                                >
                                <img
                                    src={remove} 
                                    height="15px"
                                    weight="15px"
                                    alt="delete"
                                    className="imgRemoveTemperament"
                                    />
                                </button>
                            </p>
                    )}  
                    </div>
                <div>
                        <button
                            className="createDogButton"
                            type="submit"
                            disabled={input.temperament.length < 1 || input.temperament.length >= 15 ? true : false}
                            onClick={(e) => handleSubmit(e)}
                        >Create Dog</button>
                    </div>
            </div>
        </div>
    )

}