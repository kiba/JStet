
function NamePage(var pages)
{
  var self = this;
  self.typing = true;
  self.initialize = function()
  {
    
  };
  self.call = function()
  {
    textFont(font,18);
    text("What do you wish the name to be?",150,210);
    text(self.pages.input.string,170,240);
  };
}
