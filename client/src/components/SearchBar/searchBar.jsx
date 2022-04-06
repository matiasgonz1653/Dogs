import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../actions/index";


export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")


    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name.length === 0) {
            return alert ("Ingresa un valor para buscar")
        } else{
            dispatch(getDogName(name));
            setName("")
        }
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    onKeyPress={e => e.key === 'Enter' && handleSubmit(e) }
                    onChange={e => handleInputChange(e)}
                />
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>
            </div>
        </div>
    )

}