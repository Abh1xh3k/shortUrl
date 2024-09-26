const express= require('express');
const router=express.Router();

const URL = require('../models/url');  // Adjust the path according to your folder structure


router.get('/' ,async (req,res)=>{
    const allUrl= await URL.find({});
    return res.render("home",{
        urls:allUrl,
    })
   }
)
module.exports=router