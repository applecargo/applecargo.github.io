$( document ).ready(function() {

    ////utilities
    
    //UI - btn
    //multiple binding is allowed in jquery : http://stackoverflow.com/a/4951426
    $('.ui-btn').click(function() {
	$(this).removeClass('bg-blue').addClass('bg-yellow');
	setTimeout(function() {
	    $(this).removeClass('bg-yellow').addClass('bg-blue');
	}.bind(this), 300);
    });
    // $('.ui-btn').click();
    
    //UI - playbtn (an interactive jquery controlled inline SVG button)
    $('.ui-playbtn').click(function() {
	if ($(this).data('state') == 'stopped') {
	    $(this).data('state', 'playing');
	    $(this).find('.play').hide();
	    $(this).find('.stop').show();
	    $(this).data('play_fn')();
	    //check player's state
	    var p1id = setInterval(function() {
    		if($(this).data('done_fn')() == true) {
		    $(this).data('state', 'stopped');
		    $(this).find('.play').show();
		    $(this).find('.stop').hide();
    		    clearInterval(p1id);
    		}
	    }.bind(this), 500);
	} else 	if ($(this).data('state') == 'playing') {
	    $(this).data('state', 'stopped');
	    $(this).find('.play').show();
	    $(this).find('.stop').hide();
	    $(this).data('stop_fn')();
	}
    });
    $('.ui-playbtn').data('state', 'stopped');
    $('.ui-playbtn .play').show();
    $('.ui-playbtn .stop').hide();
    // $('.ui-playbtn').data('play_fn', function() { console.log('play_fn'); }); // utillize callback functions!!
    // $('.ui-playbtn').data('stop_fn', function() { console.log('play_fn'); }); // utillize callback functions!!
    // $('.ui-playbtn').data('done_fn', function() { console.log('play_fn'); }); // utillize callback functions!!
    
    //UI - tgl
    $('.ui-tgl').change(function() {
	if ($(this).prop('checked') == true) {
	    $(this).removeClass('bg-green').addClass('bg-red');
	}
	else {
	    $(this).removeClass('bg-red').addClass('bg-green');
	}
    });
    // $('.ui-tgl:nth(0)').prop('checked', true).change(); //don't forget to trigger evt, 'change'.
    
    //pages set-list
    var pages = {
	'reserve': 0,
	'loading': 1,
	'session1': 2,
	'session2': 3,
	'session3': 4
    };

    //UI - page arbitrator
    var cur_page = 0;
    function changePage(page) {
	$('.ui-page:nth(' + cur_page + ')').fadeOut(500);
	$('.ui-page:nth(' + page + ')').fadeIn(500);
	cur_page = page;
    }

    //------------------------------------------------------------------------------------------------------------------------------//

    // connect server
    var socket = io('http://52.78.239.112:5100'); // amazon aws ec2 node.js server
    // var socket = io('http://localhost:5100'); // localhost testing server

    //// select seat page
    $("#selseat").submit(function(event) {
	event.preventDefault(); // to stop refreshing.. (actual submit action)

	var seatval = $("#selseat input:first").val();
	
	if (seatval >= 1 && seatval <= 30) {
	    socket.emit('seatsel', $("#selseat input:first").val() - 1);
	    changePage(pages['loading']);
	    audioloader(seatval);
	}
    });

    //download audio data
    var clap; // clap all, clap!
    var player1; // for session 1
    var player2; // for session 2
    var player3; // for session 3
    var mysound; // for session 3
    function audioloader(seatNo) {
	/* prepare track urls*/
	var url1 = "audio/phonecall-cricket/BYOPNEW-";
	var url2 = "audio/trk01/";
	var url3 = "audio/edelweiss/edelweiss-";
	var url4 = "audio/soundfiles/";
	var seatNo_str = "";
	
	/* ("0" + seatNo).slice(-2) : 00, 01, 02, ... style.. digits..*/
	seatNo_str = ("0" + seatNo).slice(-2);
	
	clap = new Tone.Player({ "url" : "audio/clap.wav" }).toMaster();
	player1 = new Tone.Player({ "url" : url1.concat(seatNo_str).concat(".mp3") }).toMaster();
	player2 = new Tone.Player({ "url" : url2.concat(seatNo_str).concat(".mp3") }).toMaster();
	player3 = new Tone.Player({ "url" : url3.concat(seatNo_str).concat(".mp3") }).toMaster();
	mysound = new Tone.Player({ "url" : url4.concat(seatNo_str).concat(".mp3") }).toMaster();
	
	Tone.Buffer.on("load", function(){
	    changePage(pages['session1']);
	}.bind(this));
	//-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    }

    //announcemnt audio
    socket.on('clap', function() {
	// console.log('clap');
	clap.start();
    });
    
    // player session #1
    $('#playbtn1').data('play_fn', function() { player1.start(); });
    $('#playbtn1').data('stop_fn', function() { player1.stop(); });
    $('#playbtn1').data('done_fn', function() {	return (player1.state == "stopped"); });

    //
    $('#pagechg1to2').click(function() {
	changePage(pages['session2']);
    });

    // player session #2
    $('#playbtn2').data('play_fn', function() { player2.start(); });
    $('#playbtn2').data('stop_fn', function() { player2.stop(); });
    $('#playbtn2').data('done_fn', function() {	return (player2.state == "stopped"); });
    
    //
    $('#pagechg2to1').click(function() {
	changePage(pages['session1']);
    });

    // network-driven playall/stopall
    socket.on('playall-start', function(msg) {
	switch(msg) {
	case 1:
	    if ($('#playbtn1').data('done_fn')() == false) {
		$('#playbtn1').click(); //stop
	    }
	    $('#playbtn1').click(); //start again
	    break;
	case 2:
	    if ($('#playbtn2').data('done_fn')() == false) {
		$('#playbtn2').click(); //stop
	    }
	    $('#playbtn2').click(); //start again
	    break;
	default:
	    ;
	}
    });
    socket.on('playall-stop', function(msg) {
	switch(msg) {
	case 1:
	    if ($('#playbtn1').data('done_fn')() == false) {
		player1.stop();
	    }
	    break;
	case 2:
	    if ($('#playbtn2').data('done_fn')() == false) {
		player2.stop();
	    }
	    break;
	default:
	    ;
	}
    });
    
});
