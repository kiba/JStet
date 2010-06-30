
//Data type is 2 for gameplay commands.
function GameProtocol(net)
{
  var self = this;
  self.net = net;
  self.net.game = self;
  self.engine = null;
  self.lastMessage = null;
  self.requestGame = function()
  {
    data = [2,0];
    self.net.send(data);
  };
  self.processData = function(data)
  {
    switch(data[0])
    {
    case 1:
      if (self.checkIdentical(data))
      {
        console.log("Reaction sent.");
	engine.write_current(data[1],data[2]);
        self.net.send([2,1]);
      }
      break;
    }
  };
  self.checkIdentical = function(data)
  {
    if (self.lastMessage == null)
    {
      self.lastMessage = [data[1],data[2]];
      return true;
    }
    else if(self.lastMessage[0] != data[1] && self.lastMessage[1] != data[2])
    {
      self.lastMessage = [data[1],data[2]];
      return true;
    }
    return false;
  };
}
