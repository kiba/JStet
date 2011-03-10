
function GameListPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = false;
  self.pointer = 0;
  self.initialize = function()
  {
    self.refresh = new TextButton("Refresh",100,450,20);
    self.effects = new ListEffects(self);
    self.effects.add(self.refresh.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.names = function()
  {
    text("Available Games:",112,80);
    line(100,85,300,85);
    var increment = 100;
    var games = list_protocol.games;
    for (var i = 0; i < games.length; i++)
    {
      text(games[i].name,100,increment);
      increment += 18;
    }
    if (games.length > 0)
    {
      ellipse(300,95 + (self.pointer * 16),10,10);
    }
  };
  self.enter = function()
  {
    self.pages.data.update("game",list_protocol.games[self.pointer].name);
    self.pages.turn();
  };
  self.size = function()
  {
    text("There are " + list_protocol.size + " game(s) running",0,18);
  };
  self.call = function()
  {
    listKey(self,list_protocol.names.length - 1);
    textFont(font,18);
    self.size();
    self.names();
    self.refresh.display();
  };
}
