const mongoose=require("mongoose");

const PersonSchema=new mongoose.Schema({
    name:String,
    age:Number,
    favoriteFoods:[String]
});

module.exports=mongoose.model("Person", PersonSchema);