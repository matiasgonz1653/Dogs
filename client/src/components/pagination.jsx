import React from "react";

export default function Paginado ({DogsOnPage, allDogs, paginado}) {
    const pageNumbers = []

    for(let i = 0; i<=Math.ceil(allDogs/DogsOnPage); i++) {
        pageNumbers.push(i+1)
    }


    return(
        <div>
            <ul>
                {pageNumbers?.map(n => (
                <li className="number" key={n}> //lista
                    <a onClick={() => paginado(n)}>{n}</a>    
                </li>
            ))}
            </ul>    
        </div>
    )
}