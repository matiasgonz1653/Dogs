//const { API_KEY } = process.env;
const axios = require("axios");
const { Temperament } = require("../db");

const getTemperament = async () => {
    let api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=a7a64a4a-91b2-4745-8551-d10ba1331755`);
    let allTemperament = await api.data.map((temp) => {return temp.temperament}).join().split(",");

    let temps = [];

    allTemperament.map((c) => {
        if (!temps.includes(c.trim()) && c) {
            temps.push(c.trim());
        }
    });
    
    temps.map(async (d) => {
        await Temperament.findOrCreate({
            where: {
                name: d
            },
        });
    });
};

module.exports = {
    getTemperament,
};