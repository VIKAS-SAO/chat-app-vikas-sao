const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
 const { adduser, removeuser , getUsersInRoom } = require('./utils/users.js')
 
  
 
  
 
const port=process.env.PORT||1000

const app=express()
const server=http.createServer(app)
const io=socketio(server)

const publicdirectory=path.join(__dirname,'../public') 
app.use(express.static(publicdirectory))


 io.on('connection',function(socket){
   // joining of users
    let username=''
    let room=''
   
   socket.on('join',function(user){

   // console.log(user)
      // 
      var x=adduser(user)
       if(x===1){
           socket.emit('error1') 
       }
       else if(x===2){
        socket.emit('error2') 
       }else{
           username=user.viewname
           room=user.roomname
        socket.join(room)
        socket.emit('welcome',username)
        socket.broadcast.to(room).emit('notification_login',user)
        io.to(room).emit('refresh',getUsersInRoom(room))
       }

       
   })





     socket.on('message',function(node){
        socket.broadcast.to(room).emit('message',node)
    })

   

    socket.on('disconnect',function(){ 
        removeuser({viewname:username,roomname:room})
        socket.broadcast.to(room).emit('notification_logout',{viewname:username,roomname:room}) 
        io.to(room).emit('refresh',getUsersInRoom(room))
    })
   
     

})


    

server.listen(port,function(){
    console.log('listeing to port  '+port )
})
 
 