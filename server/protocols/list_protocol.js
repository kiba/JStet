var sys = require('sys');
var game = require('../protocols/game_protocol');


function size()
{
  var data = [5,[0,game.size()]];
  return data;
}

function games()
{
  var games = game.games();
  if (games.length != 0)
  {
    var data = [5,[1,game.games()]];
    return data;
  }
  else
  {
    return [5,[2]];
  }
}

exports.process_data = function(request)
{
  switch(request)
  {
  case 0:
    {
      return JSON.stringify(size());
    }
  case 1:
    {
      return JSON.stringify(games());
    }
  }
}
