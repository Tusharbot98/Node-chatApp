var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  
 var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text( `${message.from} :  ${formattedTime}  ${message.text}`);

  jQuery('#messages').append(li);
});


jQuery('#message-form').on('submit',function(e){
  
  var messageTextBox = jQuery('[name=message]');
  e.preventDefault();
  socket.emit('createMessage',{
    from:'user',
    text:messageTextBox.val()
  },function(){
    messageTextBox.val('')
  })
})



var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
 if (!navigator.geolocation) {
   return alert('geo location is not supported by your browser')
 }
 locationButton.attr('disabled','disabled').text('Sending location....')
 navigator.geolocation.getCurrentPosition(function (position) {
   locationButton.removeAttr('disabled').text('Send location')
  socket.emit('createLocationMessage',{
    longitude:position.coords.longitude,
    latitude:position.coords.latitude
  });
 }, function () {
  locationButton.removeAttr('disabled').text('Send location')
   alert('unable to fetch location')
 });})

 socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var  a =jQuery('<a target="_blank">My current location </a>');

  li.text(`${message.from} : ${formattedTime} `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
 })
