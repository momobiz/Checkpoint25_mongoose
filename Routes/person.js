const mongoose=require("mongoose");
const express=require("express");
const Person = require("../Models/Person");
const router=express.Router();

// Enregistrement de  personnes dans la bdd 
router.post('/addperson', (req, res)=>{
    const {name, age, favoriteFoods}=req.body;
    const newPerson=new Person({
        name:name,
        age:age,
        favoriteFoods:favoriteFoods
    });
    try{
        newPerson.save()
        res.send(newPerson);
    }catch(err){
        console.log('impossible d\'enregister la personne dans la Bdd' );
    }
  

})
// Recherche de personne par nom 
router.get("/person/:name",async (req, res)=>{
    let {name}=req.params;
    
    try{
        const personnes=await Person.find({name})
       res.send(personnes)
    }catch(err){
        console.log(`ìmpossible de recuperer  ${name}`)
    }
    
})

//Recherche d une personne par favoriteFoods
// exemple d'entree sur postman {"favoriteFoods":["pizza"]}


router.post("/favoriteFoods", async (req, res)=>{
    const favFood=req.body.favoriteFoods;
    try{
        let unePersonne=await Person.findOne({favoriteFoods:{$all:favFood}})
        res.send(unePersonne);

    }catch(err){
        console.log('enregistrement introuvable')
    }
  

})
// Recherche dune personne par id
//exemple d'entree sur postman localhost:3000/5fabef9e99c1481504365aa0

router.get("/:_id", async (req,res)=>{
  const _id=req.params._id;

    try{

        let personne=await Person.findById(_id);
        res.send(personne);

    }catch(err){
       console.log("echec de votre recherche par id");
    }
   


})
//Recherche de personne par id+ajout d un nouveau favoriteFoods et enregistrement dans Bdd
// sur postman { "_id":"5fabef9e99c1481504365aa0", "favoriteFoods":"madfouna"}
router.post("/updateFood", async (req, res)=>{
    try{
        let personne=await Person.findById(req.body._id);
        personne.favoriteFoods.push(req.body.favoriteFoods);
        personne.save();
        res.send(personne)
    }catch(err){
        console.log("impossible d ajouter un nouveau favoriteFood")
    }
})
// mise à jour d 'un document avec findOneAndUpdate 
// exemple d entree sur postman {"name":"dalia", "age":20}
 
router.put("/updateAge", async (req, res)=>{
    try{
        let pers= await Person.findOneAndUpdate({name:req.body.name}, {$set:{age:req.body.age}}, {new:true})
         res.send(pers);
        
    }catch(err){
        console.log('echec de la mise à jour de l\'age' );

    }

})
//Suppression d un document en utilisant model.findByIdAndRemove
//postaman localhost:3000/remove/dvveve5115181659

router.delete("/remove/:id", async(req, res)=>{
    //const _id=req.params.id;
    try{
       await  Person.findByIdAndDelete({_id:req.params.id}); 
       res.send(`suppression de la personne d id : ${req.params.id}`)

   

    }catch(err){
        console.log('echec de la suppression'); 
    }

} )
// suppression de plusieurs documents avec model.remove
router.delete("/removeByName/:name", async (req, res)=>{
    try{
        await Person.deleteMany({name:req.params.name})
        res.send(`suppression des personnes ayant le nom ${req.params.name}`)

    }catch(err){
        console.log("echec de la suppression")

    }
})
//chainage pour recherche d enregistrement 
router.get("/searchpersons", async(req, res)=>{
    try{
       let personnes=await Person.find({favoriteFoods:{$all: ["burrito"]}}).sort({name:'asc'}).limit(2).exec();
        res.send(personnes); 
    }catch(err){
        console.log("echec dans la recherche")
    }
    

})










module.exports=router;
