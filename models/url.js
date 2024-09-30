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
        // unique:true,
    },
    visitHistory:[],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
},
  {timestamp:true});

  const URL = mongoose.model('url', urlSchema);

module.exports=URL;