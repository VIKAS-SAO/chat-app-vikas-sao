 
 

 const socket=io()
  

const $message_form=document.getElementById('message-form') 
const $sendbutton=document.getElementById('sendlocation') 
const $input=document.getElementById('input') 
const $submitbutton=document.getElementById('submit') 
const $emptybox=document.getElementById('empty')
const $messagebox=document.getElementById('messages')
const $name_list =document.getElementById('name-list')

const paramameter = new URLSearchParams(window.location.search)

const username= paramameter.get('viewname')
const room= paramameter.get('roomname') 


 
$message_form.addEventListener('submit',function(e){
    e.preventDefault()
    $submitbutton.setAttribute('disabled','disabled') 
    var message=$input.value 
    var date=new Date()
    var node=" <div class='outer_self_box'> <b class='sender'>" + username + "</b><p class='message'>"  + message + "</p> <p class='time'>" +date.toLocaleTimeString() + "</p> </div>"
    $messagebox.innerHTML+=node
    $submitbutton.removeAttribute('disabled')
    $input.value=''
    $input.focus()

    var node=" <div class='outer_other_box'> <b class='sender'>" + username + "</b><p class='message'>"  + message + "</p> <p class='time'>" +date.toLocaleTimeString() + "</p> </div>"
    socket.emit('message',node)
    autoscroll()

})

socket.on('message',function(node){
    $messagebox.innerHTML+=node
    $submitbutton.removeAttribute('disabled')
    $input.value=''
    $input.focus()
    autoscroll()
})


socket.on('error1',function(){
    alert('Please enter a username and room name !')
    location.replace('/')
})
 
socket.on('error2',function(){
    alert('Please enter another credentials !')
    location.replace('/')
})
socket.on('welcome',function(user){
    alert('Welcome !  '+user)
    
})

socket.on('refresh',function(userlist){
    $name_list.innerHTML=''
    for(var i=0;i<userlist.length;i++){
        $name_list.innerHTML+="<p>" + userlist[i].viewname  + "</p>"
    }
    
})
socket.on('notification_login',function(user){  
        $messagebox.innerHTML+="<p class='notification'>" + user.viewname  + "  just joined </p>"  
})
socket.on('notification_logout',function(user){  
    $messagebox.innerHTML+="<p   class='notification' >" + user.viewname  + "  has left !</p>"  
})
 
socket.emit('join',{viewname:username,roomname:room})

























//autoscrolling function


const autoscroll = () => {
    // New message element
    const $newMessage = $messagebox.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messagebox.offsetHeight

    // Height of messages container
    const containerHeight = $messagebox.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messagebox.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messagebox.scrollTop = $messagebox.scrollHeight
    }
}