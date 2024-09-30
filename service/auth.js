const jwt= require("jsonwebtoken");
const secret='abhi%123';


function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },
    secret
);
    
}

function getUser(token){
    // console.log(token)
    try{
         if(!token) return null;
        return jwt.verify(token,secret);
    }
    catch(e){
        console.log("token not found")
    }
}
module.exports={
    setUser,
    getUser
};