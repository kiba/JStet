
function GameListPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.pointer = 0;
  self.initialize = function()
  {
    self.refresh = new TextButton("Refresh",100,450,20);
    self.effects = new ListEffects(self);
    self.effects.add(self.refresh.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.games = function()
  {
    text("Available Games" + " " + "p",112,80);
    line(100,85,310,85);
    line(280,70,280,400);
    line(310,70,310,400);
    var increment = 100;
    var games = list_protocol.games;
    for (var i = 0; i < games.length; i++)
    {
      text(games[i].name,100,increment);
      if (games[i].password == true)
      {
	rect(285,increment - 10,10,10);
      }
      increment += 18;
    }
    if (games.length > 0)
    {
      ellipse(330,95 + (self.pointer * 16),10,10);
    }
  };
  self.enter = function()
  {
    self.pages.data.update("password",list_protocol.games[self.pointer].password);
    self.pages.data.update("name",list_protocol.games[self.pointer].name);
    self.pages.next();
  };
  self.size = function()
  {
    text("There are " + list_protocol.size + " game(s) running",0,18);
  };
  self.call = function()
  {
    textFont(font,18);
    self.size();
    self.games();
    self.refresh.display();
  };
  self.key = function()
  {
    if (list_protocol.games.length > 0)
    {
      var size = list_protocol.games.length - 1;
    }
    else
    {
      var size = 0;
    }
    switch(key)
    {
      //arrow key up
    case 119:
      {
	if (self.pointer > 0)
	{
	  self.pointer -= 1;
	}
	break;
      }
    case 115:
      {
	if (self.pointer < size)
	{
	  self.pointer += 1;
	}
	break;
      }
    case 10:
      {
	self.enter();
	break;
      }
    }
  };
}
