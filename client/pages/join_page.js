
function JoinPage(var pages)
{
  var self = this;
  self.pages = pages;
  self.typing = false;
  self.pointer = 0;
  self.initialize = function()
  {
    self.pointer = self.pages.pages[0].pointer;
    self.yes = new TextButton("Yes",100,100,100);
    self.no = new TextButton("No",100,200,100);
  };
  self.call = function()
  {
    textFont(font,18);
    self.yes.display();
    self.no.display();
  };
}
