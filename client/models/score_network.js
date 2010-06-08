

function ScoreNetwork(score)
{
  var self = this;
  self.ws = null;
  self.data = null;
  self.score = score;
  self.net = self;
  self.initialize = function()
  {
    self.ws = new WebSocket('ws://localhost:7000');
    self.ws.onmessage = function(event)
    {
      self.data = JSON.parse(event.data);
      self.score.changeMinimum(self.getLimit());
    }
    self.ws.onclose = function()
    {
      console.log("Welcome to our world");
    }
  }
  //Return the mininum score to submit score to database.
  self.getLimit = function()
  {
    if (self.data.status == true)
    {
      return self.data.scores[99];
    }
    return false;
  }
  this.transmitScore = function()
  {
    var message = {
      name = "kiba",
      points = self.score.points,
    };
    data = JSON.stringify(message);
    self.ws.send(data);
  }
}