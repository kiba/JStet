
function RadioButton()
{
  var self = this;
  self.state = false;
  self.height = 10;
  self.width = 10;
  self.display = function(var x, var y)
  {
    stroke(255);
    ellipse(x,y,self.width,self.height);
  };
}