$( document ).ready(function() {

    // connect server
    var socket = io('http://52.78.239.112:5300'); // amazonaws ec2 node.js server

    // $('form').submit(function(){
    //   socket.emit('chat message', $('#m').val());
    //   $('#m').val('');
    //   return false;
    // });

    socket.on('seatstat', function(data){
    	for (var i = 0; i < data.seatstat.length; i++) {
    	    $(".seats:nth(" + i + ")").prop("checked", data.seatstat[i]);
    	}
    });
    
    socket.on('rollcnt', function(data){
	$("#rollcnt").text(data.rollcnt);
    });
    
    // io.on("message", function (msg) {
    // 	io.emit('', $('#m').val());
    // 	if (msg == "/rollcnt") $("#rollcnt").text(oscMsg.args[0].value);

    // 	if (msg.address == "/seatstat")
    // 	{
    // 	    var seatstat = oscMag.args[0].value;
	    
    // 	    for (var i = 0; i < seatstat.length; i++) {
    // 		$(".seats:nth(" + i + ")").prop("checked", seatstat[i]);
    // 	    }
    // 	}
    // });

    // oscPort.
});
