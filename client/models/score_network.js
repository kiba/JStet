

function scoreNetwork()
{
  ws = new WebSocket('http://localhost:7000');
  ws.onmessage = function(event)
  {
    data = JSON.parse(event.data);
  }
  ws.onclose = function()
  {
    console.log("Welcome to our world");
  }
}