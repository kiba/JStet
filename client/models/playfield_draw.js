
function PlayFieldDraw()
{
  var self = this;
  self.x = 50;
  self.y = 50;
  self.width = 200;
  self.height = 400;
  self.display = function(var x)
  {
    rect(self.x + x,self.y,self.width,self.height);
    rect(self.x + x + self.width,self.y,100,self.height);
  };
}
