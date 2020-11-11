const express=require("express");
const app=express();
const port=3000;
const atlasConnect=require("./config/atlasConnect");
const router=require("./Routes/person");

atlasConnect();

app.use(express.json());

app.use("/", router);

app.get('/',(req, res)=>{
     req.send('checkpoint Monngoose')
})


app.listen(port, ()=>{
    try{
        console.log('le serveur est lancé et ecoute les requetes sur le port 3000')
    }catch(err){
        console.log('impossible de se connecter au serveur')
    }
})

