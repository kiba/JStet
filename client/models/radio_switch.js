
function RadioSwitch()
{
  var self = this;
  self.circles = [];
  self.add = function(var button)
  {
    self.circles.push(button);
  };
  self.check = function(var n)
  {
    self.circles[n].state = true;
    for(var i = 0; i < self.circles.size; i++)
    {
      if (i != n)
      {
	self.circles[i].state = false;
      }
    }
  };
  self.use = function(var collision)
  {
    self.collision = collision;
    for (var i = 0; i < self.circles.length; i++)
    {
      self.collision.add_circle(self.circles[i]);
    }
  };
}
