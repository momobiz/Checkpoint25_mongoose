const mongoose=require("mongoose");
const config=require("config");
const url=config.get("MONGO_URL");

const atlasConnect=()=>{
    mongoose.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true  },()=>{
        try{
            console.log("connexion a la Bdd réussie")

        }catch(err){
            console.log("impossible de se connecter a la Bdd")
        }
    })

}
module.exports=atlasConnect;