let express=require('express');
let Joi=require('joi');
let route=express.Router();
let Genre=require('../schema/genre.schema');
let Music=require('../schema/music.schema');

route.post("/music",async(req,res)=>
{
let {error}=validateError(req.body);
if(error){return res.status(402).send(error.details[0].message)};
let genre=await Genre.GenreModel.findById(req.body.genreId);
if(!genre){return res.status(401).send({message:"id not found"})};
let createMusic=new Music.MusicModel({
    musicName:req.body.musicName,
    singerName:req.body.singerName,
    price:req.body.price,
    genre:{
        _id:genre._id,
        name:genre.name
    },
    noStocks:req.body.noStocks
});
let movie=await createMusic.save();
res.send({message:"music data added",movie});
});


function validateError(error)
{
    let schema=Joi.object({
        musicName:Joi.string().min(5).max(60).required(),
        singerName:Joi.string().min(5).max(60).required(),
        price:Joi.number().required(),
        genreId:Joi.string().required(),
        noStocks:Joi.number().required()
    });
    return schema.validate(error);
}

module.exports=route;