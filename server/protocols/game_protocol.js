var sys = require('sys');
var sessions = new Array();
var game = require('../modes/game_loop');
var players = require('../models/players_manager');
function Session()
{
  var self = this;
  self.events = new Array();
  self.ids = new Array();
  self.name = null;
  self.password = null;
  self.players = 1;
  self.game = game.create_new();
  self.initialize = function()
  {
    for (var i = 0; i < self.ids.length; i++)
    {
      self.add_events([[self.ids[i],0]]); //0 tell clients to initalize game mode.
    }
    self.game.initialize(self.ids);
    self.update_events();
  };
  self.move_right = function(id)
  {
    self.game.move_right(id);
  };
  self.move_left = function(id)
  {
    self.game.move_left(id);
  };
  self.move_down = function(id)
  {
    self.game.move_down(id);
  };
  self.rotate = function(id)
  {
    self.game.rotate(id);
  };
  self.add_events = function(loop_events)
  {
    for (i = 0; i < loop_events.length; i++)
    {
      self.events.push([2,loop_events[i]]);
    }
  };
  self.update_events = function()
  {
    self.add_events(self.game.get_data());
  };
  self.clear = function()
  {
    self.events = new Array();
  };
  self.get_data = function()
  {
    return self.events;
  };
  self.get_score = function()
  {
    return self.game.score;
  };
  self.run = function()
  {
    self.game.run_game();
  };
  self.authenticate = function(password,id)
  {
    if (password == self.password)
    {
      self.ids.push(id);
    }
    return false;
  };
}

exports.process = function(data,id)
{
  switch(data[1])
  {
  case 0:
    sys.log("Game created.");
    var new_game = new Session();
    new_game.ids.push(id);
    new_game.players = 1;
    new_game.name = "single_player";
    new_game.password = "";
    new_game.initialize();
    sessions.push(new_game);
    break;
  case 1:
    sys.log("Reaction clear.");
    break;
  case 2:
    sys.log("Movement instruction received");
    move(id,data[2]);
    break;
  case 3:
    sys.log("Game created.");
    var new_game = new Session();
    new_game.ids.push(id);
    new_game.players = 2;
    new_game.name = data[2];
    new_game.password = data[3];
    sessions.push(new_game);
    break;
  case 4:
    sys.log("Game is running");
    sessions[find_by_id(id)].run();
    break;
  }
};

function find_by_name(name)
{
  for (var i = 0;i < sessions.length;i++)
  {
    if(sessions[i].name == name)
    {
      return i;
    }
  }
  return -1;
}

function find_by_id(id)
{
  for (var i = 0;i < sessions.length;i++)
  {
    for(var o = 0;o < sessions[i].ids.length;o++)
    {
      if (sessions[i].ids[o] == id)
      {
	return i;
      }
    }
  }
  return -1;
}

function move(id,type)
{
  location = find_by_id(id);
  if (location == -1)
  {
    return false;
  }
  switch(type)
  {
  case 1:
    sessions[location].move_right(id);
    break;
  case 2:
    sessions[location].move_left(id);
    break;
  case 3:
    sessions[location].move_down(id);
    break;
  case 4:
    sessions[location].rotate(id);
    break;
  }
}

exports.get_data = function(id)
{
  var location = find_by_id(id);
  if (location == -1)
  {
    return false;
  }
  sessions[location].update_events();
  var data = sessions[location].get_data();
  sessions[location].clear();
  return data;
}


exports.get_sessions = function()
{
  return sessions;
}

exports.get_score = function(id)
{
  var location = find_by_id(id)
  if (location == -1)
  {
    return false;
  }
  var score = sessions[location].get_score();
  return score;
}


exports.destroy = function(id)
{
  var location = find_by_id(id);
  if (location == -1)
  {
    return false;
  }
  sys.log("Destroyed game: " + id);
  sessions[location].over = true;
  sessions.splice(location,1); 
}

exports.size = function()
{
  return sessions.length;
}

exports.games = function()
{
  var games = [];
  for (var i = 0; i < sessions.length; i++)
  {
    if (sessions[i].players == 2)
    {
      var pass = false;
      if (sessions[i].password != null)
      {
	pass = true;
      }
      games.push([sessions[i].name,pass]);
    }
  }
  return games;
}


exports.authenticate = function(name,pass,id)
{
  return sessions[find_by_name(name)].authenticate(pass,id);
}
