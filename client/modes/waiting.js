
function WaitingMode()
{
  var self = this;
  self.password = null;
  self.display = function()
  {
    background(0,0,0);
    textFont(font,18);
    text("Waiting for another player to join...",250,350);
    if (self.password != null)
    {
      text("Give the password below and give it to your friend.",250,370);
    }
  };
}
