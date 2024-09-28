const sessionIdToUsermap=new Map();

function setUser(id,user){
    return  sessionIdToUsermap.set(id,user)
}
function getUser(id){
    return sessionIdToUsermap.get(id);
}
module.exports={
    setUser,
    getUser
};