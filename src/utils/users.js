const users=[]
 
function adduser(user){
   // console.log(user.viewname,user.roomname)
      let username=user.viewname.trim().toLowerCase()
      let room=user.roomname.trim().toLowerCase()
 
     if(!username || !room){
        return 1
     }
     for(var i=0;i<users.length;i++){
            if(users[i].viewname==username && users[i].roomname==room){
                return 2
            }
     }
     users.push(user);
     return users
      
}

function removeuser(user) {
    var index=-1
    for(var i=0;i<users.length;i++){
        if(users[i].viewname===user.viewname && users[i].roomname===user.roomname){
            index=i
            break 
        }
    }  
    users.splice(i,1)
}


function getUsersInRoom(room){
    var list=[]
    for(var i=0;i<users.length;i++){
        if(users[i].roomname==room){
            list.push(users[i])
        }
    }
    return list
}



 



 module.exports={
     adduser,
     removeuser,
     getUsersInRoom
     
      
  }
 
  