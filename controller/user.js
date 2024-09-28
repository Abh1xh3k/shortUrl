const Users = require("../models/user");
const {v4:uuidv4}=require('uuid');
const {setUser}=require('../service/auth');
async function handleuserSignup(req,res){
 const {name, email,password}=req.body;
 await Users.create({
    name,
    email,
    password,
 })
 return res.render("/");
}
async function handleuserLogin(req,res){
    const {email,password}=req.body;
     const user=await Users.findOne({email,password});
     if(!user)
         return res.render("login",{
        error:"Invalid Username or password",
     });
     const sessionId=uuidv4();
     setUser(sessionId,user);
     res.cookie('uid', sessionId)
    return res.redirect('/');
   }
module.exports={handleuserSignup, handleuserLogin}