const mongoose= require('mongoose');

const urlSchema=new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirecturl:{
        type:String,
        required:true,
        unique:true,
    },
    visitHistory:[],
},
  {timestamp:true});

  const URL = mongoose.model('url', urlSchema);

module.exports=URL;