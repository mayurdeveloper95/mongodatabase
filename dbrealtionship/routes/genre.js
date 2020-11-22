let express=require('express');
let route=express.Router();
let Genre=require('../schema/genre.schema');

route.post("/genre",async(req,res)=>
{
let createGenre=new Genre.GenreModel({
name:req.body.name
});

let cg=await createGenre.save();
res.send({message:"genre added",cg});
});

module.exports =route;