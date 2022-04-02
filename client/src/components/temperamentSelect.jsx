import React from "react";

function TemperamentSelect ({allTemperaments, handleFilterByTemperament}) {
    
    return (
        <div>
            <select onChange={e=>handleFilterByTemperament(e)}>
                <option disabled selected>Temperaments</option>
                <option value="Todos">All</option>
                {allTemperaments.map(t => (
                    <option value={t.name}>{t.name}</option>
                ))}
            </select>
        </div>
    );
};