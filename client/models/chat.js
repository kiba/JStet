
function Chat()
{
  var self = this;
  self.messages = new Array();
  self.message = new Text();
  self.protocol = null;
  self.scroll = 0;
  self.limit = 550f;
  self.horizontal = 0;
  self.display = function()
  {
    var y = 20;
    for (var i = self.scroll;i < self.messages.length;i++)
    {
      text(self.messages[i],5,y+= 20);
      if (y >= 550)
      {
	y -= 20;
	return;
      }
    }
    text(self.message.get_text(),self.horizontal,600);
    //pointer
    //fill()
    //rect(self.message.get_text().length * 10,580,10,20)
  };
  self.down = function()
  {
    self.scroll += 1;
  };
  self.up = function()
  {
    self.scroll -= 1;
  };
  //left and right cannot be used since we can't know how long our texts are when draw, at least for the time being.
  self.left = function()
  {
    self.horizontal -= 1;
  }
  self.right = function()
  {
    self.horizontal += 1;
  };
  self.listen_game = function(msg)
  {
    var regex = / game$/;
    if(msg.match(regex))
    {
      game_protocol.request_game();
      return true;
    }
    return false
  };
  self.parse = function(msg)
  {
    var request = /^\/request/;
    console.log(msg.match(request));
    if (msg.match(request) != null)
    {
      if (self.listen_game(msg))
      {
	return true;
      }
      console.log("Request identified. Unclear argument.");;
      return true;
    }
    var nick = /^\/nick/;
    if (msg.match(nick) != null)
    {
      if (msg.match(/ [a-za-zA-Z]$/))
      {
	return true;
      }
      console.log("Nick command with unclear argument.");
      return true;
    }
    return false;
  }
  self.enter = function()
  {
    var verify = self.parse(self.message.get_text())
    if (verify == false)
    {
      self.protocol.send(self.message.get_text());
    }
    self.message = new Text();
  };
  self.divide = function(msg)
  {
    var spilts = [];
    while(msg.length > 35)
    {
      var next_part = msg.substring(0,35);
      msg = msg.substring(34);
      spilts.push(next_part);
    }
    spilts.push(msg);
    return spilts;
  };
  self.add_message = function(msg)
  {
    var msgs = self.divide(msg);
    for (var i = 0;i < msgs.length;i++)
    {
      self.messages.push(msgs[i]);
      if (self.messages.length > 27)
      {
	self.down();
      }
    }
  };
}