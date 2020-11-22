let express=require('express');
let Joi=require('joi');
let route=express.Router();
let Customer=require('../schema/customer.schema');
let Music=require('../schema/music.schema');

route.post("/customer",async(req,res)=>
{
let {error}=validateError(req.body);
if(error){return res.status(402).send(error.details[0].message)};
let music=await Music.MusicModel.findById(req.body.musicId);
if(!music){return res.status(401).send({message:"id not found"})};
let createCustomer=new Customer.CustomerModel({
    username:req.body.username,
    phone:req.body.phone,
    music:{
        musicName:music.musicName,
        singerName:music.singerName,
        price:music.price,
        genre:music.genre,
        noStocks:music.noStocks
    }
});
let music1=await createCustomer.save();
music.noStocks--;
await music.save();
res.send({message:"music data added",music1});
});


function validateError(error)
{
    let schema=Joi.object({
        username:Joi.string().required(),
        phone:Joi.number().min(10).required(),
        musicId:Joi.string().required()
    });
    return schema.validate(error);
}

module.exports=route;