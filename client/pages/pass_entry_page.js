
function PassEntryPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.initialize = function()
  {
    self.effects = new PassEffects(self.pages,self);
    self.effects.add_input();
    self.effects.type = true;
    self.state = 0;
    self.retry = new TextButton("Retry",100,350,350);
    self.effects.add(self.retry.rect);
    self.pages.collision.effects.add_effect(self.effects);
  };
  self.call = function()
  {
    textFont(font,18);
    if (self.state == 0)
    {
      self.first_stage();
    }
    else if (self.state == 1)
    {
      self.second_stage();
    }
    else
    {
      self.effects.input.clean();
      self.effects.type = false;
      self.fail_pass();
    }
    text(self.effects.input.string,150,300);    
  };
  self.first_stage = function()
  {
    text("After you're done, press enter.",200,360);
    text("Please type your password for the other player.", 100, 250);
  };
  self.second_stage = function()
  {
    text("Please retype the password again. Press enter when you're done.",100,250);
  };
  self.fail_pass = function()
  {
    text("Password mismatch error.",100,250);
    text("press enter to restart password entry.",100,270);
  };
  self.key = function()
  {
    if (self.state == 2)
    {
      switch(key)
      {
      case 10:
	self.state = 0;
	self.effects.type = true;
      }
    }
    else
    {
      activeType(self.effects);
    }
  };
  self.act = function()
  {
    if (self.state == 0)
    {
      self.state = 1;
      self.effects.input.clean();
    }
    else if(self.state == 1)
    {
      self.state = 0;
      self.effects.input.clean();
    }
  };
}
