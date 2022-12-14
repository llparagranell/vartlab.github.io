var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

users = [];

io.on('connection', function(socket){
   console.log('A user connected');
   socket.on('setUsername', function(data){
      
      // socket.emit('userJoined', data + " joined!.");

      
      if(users.indexOf(data) > -1){
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});

var port = 3000;

http.listen(process.env.PORT || port, function () {
  console.log("Listening on port :-" + port);
});
