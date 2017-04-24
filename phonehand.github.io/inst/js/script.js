$( document ).ready(function() {

    // connect server
    // var socket = io('http://52.78.239.112:5100'); // amazon aws ec2 node.js server
    var socket = io('http://localhost:5100'); // localhost testing server

    //// select seat page
    
    $("#selseat").submit(function(event) {
	event.preventDefault(); // to stop refreshing.. (actual submit action)

	var seatval = $("#selseat input:first").val();
	
	if (seatval >= 1 && seatval <= 30) {
	    socket.emit('seatsel', $("#selseat input:first").val() - 1);
 	    $("#resvseat").hide();
	    $("#loading").show();
	    audioloader();
	}
    });

    //download audio data
    function audioloader() {
	clap = new Tone.Player({ "url" : "audio/clap.wav" }).toMaster();
	player1 = new Tone.Player({ "url" : "audio/01.mp3" }).toMaster();
	Tone.Buffer.on("load", function(){
    	    $("#loading").fadeOut(500);
    	    $("#play1").fadeIn(500);
	}.bind(this));
	//-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    }

    //announcemnt audio
    socket.on('clap', function() {
	// console.log('clap');
	clap.start();
    });
    
    // player session #1

    //initial state
    var playing1 = 0;
    $('#playbtn #path4493').show();
    $('#playbtn #rect8475').hide();
    $('#playbtn #rect8475-3').hide();
    
    $('#playbtn').click(function() {
    	if (playing1 == 0) {
    	    playing1 = 1;
    	    playstart1();
    	} else if (playing1 == 1) {
    	    playing1 = 0;
    	    playstop1();
    	}
    });

    function playstart1() {
    	player1.start();
    	// btn shape change.
    	$('#playbtn #path4493').hide();
    	$('#playbtn #rect8475').show();
    	$('#playbtn #rect8475-3').show();

    	var p1id = setInterval(function() {
    	    if(player1.state == "stopped") {
    		playstop1();
		playing1 = 0;
    		clearInterval(p1id);
    	    }
    	}, 500);
    }

    function playstop1() {
    	player1.stop();
    	// btn shape change.
    	$('#playbtn #path4493').show();
    	$('#playbtn #rect8475').hide();
    	$('#playbtn #rect8475-3').hide();
    }

});
