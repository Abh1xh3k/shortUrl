const express= require('express');
const router=express.Router();

const URL = require('../models/url');  // Adjust the path according to your folder structure


router.get('/' ,async (req,res)=>{
    if(!req.user) return res.redirect('/login')
    const allUrl= await URL.find({ createdBy: req.user._id});
    return res.render("home",{
        urls:allUrl,
    })
   }
)
router.get('/signup', (req,res)=>{
    return res.render("signup");
})
router.get('/login', (req,res)=>{
    return res.render("Login");
})


module.exports=router