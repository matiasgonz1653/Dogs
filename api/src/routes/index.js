const axios = require('axios');
const { Router } = require('express');
const { Dog, Temperament } = require('../db');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { YOUR_API_KEY } = process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//------------api----------
const getApiInfo = async () => {
    const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const apiInfo = await apiData.data.map(d => {
        
        const arrTemp = d.temperament?.split(",");
        const temp = []
        arrTemp?.forEach(tem => {        //para cada indice de la array
            temp.push({name: tem.trim()})//para eliminar espacios y creo objeto con propiedad name
        })


        const heightMM = []
        d.height.metric.split("-")?.forEach(element => {
            heightMM.push(element.trim());
        })
        if (!heightMM[1]) {
            heightMM.push(heightMM[0])
        }


        const weightMM = []
        d.weight.metric.split("-")?.forEach(element => {
            weightMM.push(element.trim());
        })
        if (!weightMM[1]) {
            weightMM.push(weightMM[0])
        }


        return {
            ID : d.id,
            name : d.name,
            height : heightMM,
            weight : weightMM,
            life_span : d.life_span,
            temperament : d.temperament,
            image: d.image.url,
        }
    })
    return apiInfo;
}

// ----------Db------------------
const getDbInfo = async function(){
    return await Dog.findAll({
        include: {
            model: Temperament,
            atributes: ["name"],
            through: {
                attributes:[]
            }
        }
    })
}

//--------api and DB------
const getAllDogs = async function(){
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}



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

router.get("/dogs/:idRaza", async function (req, res) {
        const { idRaza } = req.params;
        const allDogs = await getAllDogs();
        if (idRaza) {
            const dog = await allDogs.filter(d => d.ID == idRaza);
            //dog.length? res.status(200).json(dog) : 
            if (dog.length>0) {
                return res.status(200).json(dog);
            } else {
                res.status(404).send("perro no encontrado");
            }
        }
        res.send("id no ingresado");
})


router.get("/temperament", async function (req, res) {
    try {
        const Api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
        const allTemperaments = Api.data.map(t => t.temperament)
        const temperament = allTemperaments.toString().split(",")
        temperament.forEach(element => {
            let temp = element.trim()
            Temperament.findOrCreate({
                where: {
                    name: temp
                }
            })
        });
        const allTemp = await Temperament.toString().findAll();
        res.status(200).send(allTemp);
    } catch (error) {
        res.status(404).send("eror 404 :C");
    }
})

router.post("/dog", async function (req, res) {

        const { name,
            min_height,
            max_height,
            min_weight,
            max_weight,
            life_span,
            temperaments,
            image } = req.body
        
        const heightMM = [];
        const minheight = min_height.toString().trim();
        const maxheight = max_height.toString().trim();
        heightMM.push(minheight, maxheight);
    
        const weightMM = [];
        const minweight = min_weight.toString().trim();
        const maxweight = max_weight.toString().trim();
        weightMM.push(minweight, maxweight);
    
        const dog = await Dog.create({
            name: name,
            height: heightMM,
            weight: weightMM,
            life_span: life_span,
            image: image ? image : "https://pbs.twimg.com/media/FGfgmSPWQAUDu4l.jpg"
        });
        
        const asociarTemp = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
    
        dog.addTemperament(asociarTemp);
    
        res.status(200).send("perro creado!");        

})

/*  router.post("/dog", async (req, res) => {
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
    
        let height = minimHeight + " - " + maximHeight;
        let weight = minimWeight + " - " + maximWeight;


        let dog = await Dog.create({
            name,
            height,
            weight,
            lifeSpan,
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
    }); */

module.exports = router;
