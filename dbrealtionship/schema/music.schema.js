let mongoose=require('mongoose');
let Genre=require('../schema/genre.schema');

let musicSchema=mongoose.Schema({
musicName:{type:String,required:true,min:20,max:60},
singerName:{type:String,required:true,min:20,max:60},
price:{type:Number,required:true},
genre:{type:Genre.genreSchema,required:true},
noStocks:{type:Number,required:true}
});

let MusicModel=mongoose.model("music",musicSchema);

module.exports={
    musicSchema,
    MusicModel
}