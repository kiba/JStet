var sys = require('sys');
var ws = require('../vendor/ws/ws');



//server stuff
var db = require('./models/database')
//start of actual server code.
var server = ws.createServer();
server.listen(7000);

function sendData()
{
  server.broacast(JSON.stringify(db.getDoc()));
}

server.addListener("listening",function(){
  sys.log("Listening for connection.");
  db.readDoc(function() {
    sys.log("Read successful.");
  });
});

server.addListener("connection",function(conn){
  sys.log("<"+conn._id+"> connected");
  sendData();
  conn.addListener("close",function(){
    db.save();
    sys.log("<"+conn._id+"> onClose");
  });
  
  conn.addListener("message",function(event){
    data = JSON.parse(event);
    db.add_to_list(data[0],data[1]);
  });
});


