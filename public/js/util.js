// this function is reduntant...
var addTimestamp = function(msg){
  var Msg = {};
  Msg.value =msg;
  //Msg.time = moment(new Date().getTime(),"LT");
  Msg.time = moment().format('LT');

  //console.log(Msg);
  return Msg;
};

// this function is reduntant...
function makeMsg(msg){
  var Msg = addTimestamp(msg);
  return Msg;
}
// this function is reduntant...
function sayHello(){
  console.log("hhhh");
}

//this function is for initialising tooltip for bootstrap...
$(document).ready(function(){
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
    console.log("tooltip activated");
  })
});
//module.exports = makeMsg;
