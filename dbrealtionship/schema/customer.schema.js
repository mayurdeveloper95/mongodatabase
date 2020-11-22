let mongoose=require('mongoose');
let Music=require('../schema/music.schema');

let customerSchema=mongoose.Schema({
username:{type:String},
phone:{type:Number,required:true},
music:{type:Music.musicSchema}
});

let CustomerModel=mongoose.model("customers",customerSchema);

module.exports={
    customerSchema,
    CustomerModel
}