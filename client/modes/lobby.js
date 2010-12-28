
function LobbyMode()
{
  var self = this;
  self.chat = new Chat();
  self.play = new PlayButton();
  self.private_session = new PrivateButton();
  self.collision = new Collision();
  self.collision.add(self.play.play);
  self.collision.add(self.private_session.private_session);
  self.collision.effect.add_effect(new LobbyEffect());
  self.display = function()
  {
    background(0,0,0);
    self.chat.display();
    self.play.display();
    self.private_session.display();
    noFill();
    stroke(255);
    rect(0,580,800,20);
    rect(0,0,400,580);
  };
}
