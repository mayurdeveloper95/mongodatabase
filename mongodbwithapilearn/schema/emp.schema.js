let mongoose=require('mongoose');

let empSchema=mongoose.Schema({
    fname:{type:String,min:3,max:15,required:true},
    lname:{type:String,min:3,max:15},
    position:{type:String,min:3,max:40,required:true},
    isAvailable:{type:String},
    salary:{type:Number}
})

let empModel=mongoose.model("Employee",empSchema);

module.exports=empModel;