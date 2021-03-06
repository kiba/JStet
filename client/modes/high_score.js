
function HighScoreMode()
{
  var self = this;
  self.name = new Input();
  self.display = function()
  {
    textFont(font,18);
    background(0,0,0);
    noFill();
    rect(300,305,55,30);
    text("You have beaten a score in the worldwide top 100 ranking.",100,250);
    text("Please enter your 5 letters identifer.",200,275);
    text("Your identifer: ",250,300);
    text(self.name.string,300,325);
  };
  self.get_name = function()
  {
    return self.name.string;
  }
  self.key = function()
  {
    var info = typing();
    switch (info)
    {
    case false:
      break;
    case -8:
      self.name.destroy();
      break;
    case -10:
      score_protocol.request_score(self.get_name());
      self.name.clean();
      game_protocol.request_delete();
      mode.change(2);
      break;
    default:
      self.name.addLetter(info);
      break;
    }
  };
}
