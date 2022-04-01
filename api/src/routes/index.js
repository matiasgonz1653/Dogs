require("dotenv").config();
const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { getAllDogs } = require("../controller/dog");
const { getTemperament } = require("../controller/temperament");
const router = Router();


router.get("/dogs", async function (req, res) {
    const { name } = req.query;
    const dogTotal = await getAllDogs();

    if (name) {
        const dogName = dogTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ? res.status(200).send(dogName) : res.status(400).send("no se encontro le perro");
    } else {
        res.status(200).send(dogTotal);
    }
})


router.get("/dogs/:id", async (req, res) => {
    const allDogs = await getAllDogs();

    const { id } = req.params;
    if (id) {
        let dogId = await allDogs.filter((obj) => obj.id == id);
        dogId.length
        ? res.status(200).send(dogId)
        : res.status(404).send("Doggo Not Found");
    }
});


router.get("/temperament", async (req, res) => {
    await getTemperament();

    const allTemperaments = await Temperament.findAll();
    const filteredTemperaments = await allTemperaments.map((obj) => obj.name);
    res.status(200).send(filteredTemperaments);
});

router.post("/dog", async (req, res) => {
    
    let {
        name,
        minimHeight,
        maximHeight,
        minimWeight,
        maximWeight,
        lifeSpan,
        image,
        createdAtDb,
        temperament,
    } = req.body;

    let height = minimHeight + " - " + maximHeight
    let weight = minimWeight + " - " + maximWeight


    let dog = await Dog.create({
        name,
        height,
        weight,
        life_span: lifeSpan,
        image: image ? image : "https://pbs.twimg.com/media/FGfgmSPWQAUDu4l.jpg",
        createdAtDb,
    });
    
    
    let temperamentDb = await Temperament.findAll({
        where: {
            name: temperament,
        },
    });
    
    dog.addTemperament(temperamentDb);
    
    res.status(200).send("Perrito creado! :D");
});

module.exports = router;
