
function ZShape()
{
  this.length = 2;
  this.color = #FF0019;
  this.get_data = function(choice)
  {
    var list = new Array();
    switch(choice)
    {
    case 0:
      {
        list.push([0,0]);
        list.push([1,0]);
        list.push([1,1]);
        list.push([2,1]);
        break;
      }
    case 1:
      {
        list.push([1,0]);
        list.push([1,1]);
        list.push([0,1]);
        list.push([0,2]);
        break;
      }
    }
    return list;
  }
}
