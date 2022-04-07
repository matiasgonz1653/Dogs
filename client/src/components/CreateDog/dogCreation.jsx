import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {getDogTemperament, postDog} from "../../actions/index"


const validate = function(input){
    let errors = {}
    
    if (!input.name){
        errors.name = "Ingresar un Nombre a la raza de perros"
    }
    if (!input.name.match(/^[A-Za-z\s]+$/)){
        errors.name = "El nombre debe contener unicamente letas"
    }
    if (input.minimHeight > input.maximHeight){
        errors.minimHeight = "El Tamaño Minimo es mayor a su tamaño maximo"
    }
    if (input.minimHeight <= 10){
        errors.minimHeight = "El tamaño minimo debe de ser mayor a 10cm" 
    }
    if (!input.minimHeight) {
        errors.minimHeight = "Ingresa un valor para el tamaño minimo de la raza "
    }
    if (!input.maximHeight) {
        errors.maximHeight = "Ingresa un valor para el tamaño maximo de la raza "
    }
    if (input.minimWeight > input.maximWeight){
        errors.minimWeight = "El peso Minimo es mayor a su peso maximo"
    }
    if (input.maximWeight <= 2){
        errors.maximWeight = "El peso maximo no puede ser menor a 2Kg" 
    }
    if  (!input.minimWeight) {
        errors.minimWeight = "Ingresa un valor para el peso minimo de la raza"
    }
    if (!input.maximWeight) {
        errors.maximWeight = "Ingresa un valor para el peso maximo de la raza"
    }
    if (input.lifeSpan < 0) {
        errors.lifeSpan = "La esperanza de vida debe de ser mayor a 1 año"
    }
    if (input.lifeSpan > 21){
        errors.lifeSpan = "Ingresar una esperaza de vida razonable"
    }
    return errors
}

export default function DogCreate(){ 
    const dispatch = useDispatch()
    const temperament = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState ({})
    
    useEffect(() => {
        dispatch(getDogTemperament())
    }, [dispatch]);
    
    const [input, setInput] = useState({
        name: "",
        minimHeight: "", 
        maximHeight: "",
        minimWeight: "",
        maximWeight: "",
        lifeSpan: "",
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
            lifeSpan: "",
            image: "",
            temperament: []
        })
        }
    }


    return(
        <div className="backgroundd">

            <button type="submit" onClick={refreshPage} className="refreshh">
			    <img
                    width="20px" height="20px"
                    className="icon"
                    src="https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-refresh-2.png"
                    alt="">
                </img>
            </button>
            
            <Link to="/home" className="buttonn">⬅ Home</Link>
            
            <div className="card-containerr">
            <form onSubmit={(e) => handleSubmit(e)}>

            <hr />

            <h1 className="titlee">Crea tu raza</h1> 

                <div className="breed">
                    <label>Nombre raza</label>
                    <input className="breedInput"
                    type= "text"
                    value= {input.name = input.name.substring(0, 1).toUpperCase() + input.name.substring(1)}
                    name="name"
                    placeholder="Breed's name"
                    onChange={(e) => handleChange(e)}/>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="minHeight">
                    <label>Tamaño Minimo</label>
                    <input className="minHeightInput"
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
                    <input className="maxHeightInput"
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
                    <input className="minWeightInput"
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
                    <input className="maxWeightInput"
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

                <div className="lifeSpan">
                    <label>Esepranza de vida</label>
                    <input className="lifeSpanInput"
                    type="number"
                    min="1"
                    max="21"
                    value= {input.lifeSpan}
                    name="lifeSpan"
                    placeholder="Breed's life span"
                    onChange={(e) => handleChange(e)}/> 
                    {errors.lifeSpan &&
                    <label className="error">{errors.lifeSpan}</label>}
                </div>

                <div className="picture">
                    <label>Imagen</label>
                    <input className="pictureInput"
                    type="text"
                    value= {input.image}
                    name="image"
                    placeholder="Picture URL..."
                    onChange={(e) => handleChange(e)}/>
                    </div>


                    <div>
                    <select onChange={(e) => handleSelect(e)}  className="listTemps">
                        <option hidden>Temperamentos del perro</option>
                        {temperament.map((temperament) => (
                            <option value={temperament}>{temperament}</option>
                        ))}
                    </select>
                </div>
                    
                <div>
                        <button
                            className="createDogButton"
                            type="submit"
                            disabled={input.temperament.length < 1 || input.temperament.length >= 10 ? true : false}
                        >Create Dog</button>
                </div>
                    
                    {input.temperament.map(el =>
                    <div className="temperamentsItems">
                        <p>{el}</p>
                    </div>
                    )}
            </form>
            </div>
        </div>
    )

}