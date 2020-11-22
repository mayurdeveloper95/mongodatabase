let mongoose=require('mongoose');

let schema=mongoose.Schema({
firstname:{type:String,min:5,max:20,reuired:true},
lastname:{type:String,min:5,max:20,reuired:true},
UserLogin:{
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
}
});

let UserModel=mongoose.model("users",schema);

module.exports=UserModel;