
function DataCollect()
{
  var self = this;
  self.data = [];
  self.create = function(var name)
  {
    self.data.push(new Info(name));
  };
  self.find = function(var name)
  {
    for (var i = 0; i < self.data.length; i++)
    {
      if (self.data[i].name == name)
      {
	return i;
      }
    }
    return -1;
  };
  self.insert = function(var i, var info)
  {
    if (i == -1)
    {
      console.log("name is false.");
      return false;
    }
    self.data[i].value = info;
  };
  self.update = function(var name, var info)
  {
    self.insert(self.find(name), info);
  };
  self.get = function(var name)
  {
    return self.data[self.find(name)].value;
  };
}
