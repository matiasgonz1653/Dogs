const { API_KEY } = process.env
const axios = require('axios')
const { Dog, Temperament } = require('../db');

const getApiInfo = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

    const dogInfo = await api.data.map(d => {

        const heightMM = []
        d.height.metric.split("-")?.forEach(element => {
            heightMM.push(parseInt(element.trim()));
        })
        if (!heightMM[1]) {
            heightMM.push(heightMM[0])
        }

        const weightMM = []
        d.weight.metric.split("-")?.forEach(element => {
            weightMM.push(parseInt(element.trim()));
        })
        if (!weightMM[1]) {
            weightMM.push(weightMM[0])
        }

        const life_SpanAA = []
        d.life_span.split("-")?.forEach(element => {
            life_SpanAA.push(parseInt(element.trim()));
        })
        if (!life_SpanAA[1]) {
            life_SpanAA.push(life_SpanAA[0])
        }

        return{
            id: d.id,
            name: d.name,
            height: heightMM,
            weight: weightMM,
            lifeSpan: life_SpanAA,
            image: d.image.url,
            temperament: d.temperament
        }
    })

    return dogInfo;
}

const getDBinfo = async () => {
    const dogInDB = await Dog.findAll({
        include:{ 
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })

    const dogInfo = await dogInDB.map(d => {
        const heightMM = []
        d.height.split("-")?.forEach(element => {
            heightMM.push(parseInt(element.trim()));
        })
        if (!heightMM[1]) {
            heightMM.push(heightMM[0])
        }

        const weightMM = []
        d.weight.split("-")?.forEach(element => {
            weightMM.push(parseInt(element.trim()));
        })
        if (!weightMM[1]) {
            weightMM.push(weightMM[0])
        }

        const life_SpanAA = []
        d.life_span.split("-")?.forEach(element => {
            life_SpanAA.push(parseInt(element.trim()));
        })
        if (!life_SpanAA[1]) {
            life_SpanAA.push(life_SpanAA[0])
        }

        return{
            id: d.id,
            name: d.name,
            height: heightMM,
            weight: weightMM,
            lifeSpan: life_SpanAA,
            image: d.image,
            temperament: d.temperaments,
            createdAtDb: d.createdAtDb,
        }
    })
    
return dogInfo;
}


const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo();
    const allInfo = apiInfo.concat(dbInfo);

    return allInfo

}

module.exports = {
    getAllDogs,
    getApiInfo
}

