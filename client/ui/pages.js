

function Pages()
{
  var self = this;
  self.collision = new Collision();
  self.pages = [];
  self.on = 0;
  self.turn = new TextButton("turn",100,500,500);
  self.turn.rect.type = 3;
  self.effect = new PageEffect(self);
  self.effect.add(self.turn.rect);
  self.data = new DataCollect();
  self.forward = function ()
  {
    self.on ++;
    if (self.on > self.pages.length - 1)
    {
      self.on --;
    }
  }
  self.key = function()
  {
    self.pages[self.on].key();
  };
  self.backward = function ()
  {
    self.on --;
    if (self.on < 0)
    {
      self.on ++;
    }
  }
  self.new_page = function()
  {
    self.collision = new Collision();
    self.initialize();
  }
  self.back = function()
  {
    self.backward();
    self.new_page();
  };
  self.next = function()
  {
    self.forward();
    self.new_page();
  };
  self.display = function()
  {
    self.turn.display();
  };
  self.run = function()
  {
    self.pages[self.on].call();
  };
  self.add = function(var object)
  {
    self.pages.push(object);
  };
  self.initialize = function()
  {
    self.pages[self.on].initialize();
    self.collision.effects.add_effect(self.effect);
  };
  self.act = function()
  {
    self.pages[self.on].act();
  };
}
