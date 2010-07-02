var sys = require('sys');
var sessions = new Array();

function Session()
{
  var self = this;
  self.events = new Array();
  self.id = null;
  self.game = require('../modes/game_loop');
  self.initialize = function(id)
  {
    self.id = id;
    self.game.initialize();
    self.add_events(self.game.get_data());
    self.game.run_game();
  };
  self.add_events = function(loop_events)
  {
    for (i = 0; i < loop_events.length; i++)
    {
      self.events.push([2,loop_events[i]]);
    }
  };
  self.clear = function()
  {
    self.events.shift();
  };
  self.get_data = function()
  {
    return self.events;
  };
}

exports.process = function(data,id)
{
  switch(data)
  {
  case 0:
    new_game = new Session();
    new_game.initialize(id);
    sessions.push(new_game);
    break;
  case 1:
    sys.log("Reaction clear.");
    sessions[find_by_id(id)].clear();
    break;
  }
};

function find_by_id(id)
{
  for (i = 0;i < sessions.length;i++)
  {
    sys.log(sessions[i].id);
    sys.log(id);
    if (id == sessions[i].id)
    {
      return i;
    }
  }
  return false;
}

exports.get_data = function(id)
{
  location = find_by_id(id)
  if (location == false)
  {
    return false;
  }
  return sessions[location].events;
}