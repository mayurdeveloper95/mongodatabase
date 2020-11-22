let express=require('express');
let Joi=require('joi');
let route=express.Router();
let User=require('../schema/user.schema');
let bcrypt=require('bcrypt');

route.post("/registerUser",async(req,res)=>
{
let {error}=validateError(req.body);
if(error){return res.status(402).send(error.details[0].message)};
let user=await User.findOne({"UserLogin.email":req.body.UserLogin.email});
if(user){return res.status(401).send({message:"email id already registered"})};
let createUser=new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    UserLogin:req.body.UserLogin
});

let salt=await bcrypt.genSalt(10);
createUser.UserLogin.password=await bcrypt.hash(createUser.UserLogin.password,salt);

let newuser=await createUser.save();
res.send({message:"user added successfully",newuser});

});


function validateError(error)
{
    let schema=Joi.object({
        firstname:Joi.string().min(5).max(20).required(),
        lastname:Joi.string().min(5).max(20).required(),
        UserLogin:{
            email:Joi.string().required().email(),
            password:Joi.string().required()
        }
    });
    return schema.validate(error);
}

module.exports =route;