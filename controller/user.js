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
 return res.redirect("/login");
}
async function handleuserLogin(req,res){
    const {email,password}=req.body;
     const user=await Users.findOne({email,password});
     if(!user)
         return res.render("login",{
        error:"Invalid Username or password",
     });
   //   const sessionId=uuidv4();
      const token =setUser(user);
   //   res.cookie('uid', token)
    return res.json({token:token});
   }
module.exports={handleuserSignup,handleuserLogin}