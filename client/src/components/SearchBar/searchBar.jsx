import react from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../actions/index";

export default function SearchBar() {

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.reventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getDogName(name));
        setName("");
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Buscar..."
                    onChange={e=>handleInputChange(e)}
                />
                <button type="submit" onClick={e=>handleSubmit(e)}>Buscar</button>
            </div>
        </div>
    )

}