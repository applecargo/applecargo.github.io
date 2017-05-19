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
	'session3': 4,
	'info': 5
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
    // var socket = io('http://52.78.239.112:5100'); // amazon aws ec2 node.js server
    var socket = io('http://13.124.127.189:5100'); // amazon aws ec2 node.js server
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
    var sounder_type; // 'playstop' or 'notes'
    var clap; // clap all, clap!
    var counting; // counting, 5-4-3-2-1-(!)
    var player1; // for session 1
    var player2; // for session 2
    var voices; // for session 3
    var brassband; // for session 3
    var intro; // for session 2-->3
    var mysound; // for session 3
    function audioloader(seatNo) {

	console.log(seatNo);

	//seatNo to string..
	var seatNo_str = ("0" + seatNo).slice(-2); // ("0" + seatNo).slice(-2) : 00, 01, 02, ... style.. digits..
	
	//announcement audio
	clap = new Tone.Player({ "url" : "audio/clap.wav" }).toMaster();
	counting = new Tone.Player({ "url" : "audio/54321.mp3" }).toMaster();

	//session #1
	var url1 = "audio/phonecall-cricket/BYOPNEW-" + seatNo_str + ".mp3";
	console.log(url1);
	player1 = new Tone.Player({ "url" : url1 }).toMaster();

	//session #2
	var url2 = "audio/trk01/" + seatNo_str + ".mp3";
	console.log(url2);
	player2 = new Tone.Player({ "url" : url2 }).toMaster();
	
	//intro (session #2 --> session #3)
	var urli = "audio/intro/" + seatNo_str + ".mp3";
	console.log(urli);
	intro = new Tone.Player({ "url" : urli }).toMaster();
	
	//session #3 - 'who am i?' mapping. --> (re)-shuffle? use the code at the end of this file!
	
	var s3_seatpos = ["voice7", "brass", "flute",
			  "voice4", "voice5", "voice2",
			  "voice4", "tuba", "voice5",
			  "voice9", "tuba", "voice8",
			  "tuba", "flute", "voice2",
			  "voice3", "voice3", "flute",
			  "voice7", "brass", "voice8",
			  "brass", "voice1", "voice6",
			  "voice6", "voice1", "brass",
			  "tuba", "voice9", "tuba"];

	//
	sounder_type = 'playstop';
	switch(s3_seatpos[seatNo-1][0]){ //seat number (1-30) --> index (0-29)
	case 'b': //load brass!
	    var url3 = "audio/edelweiss/brass.mp3";
	    brassband = new Tone.Player({ "url" : url3 }).toMaster();
	    break;
	case 'f': //load flute!
	    var url3 = "audio/edelweiss/flute.mp3";
	    brassband = new Tone.Player({ "url" : url3 }).toMaster();
	    break;
	case 't': //load tuba!
	    var url3 = "audio/edelweiss/tuba.mp3";
	    brassband = new Tone.Player({ "url" : url3 }).toMaster();
	    break;
	case 'v': //load voices.. manymany...
	    sounder_type = 'notes';
	    var url3 = "audio/edelweiss/" + s3_seatpos[seatNo-1][5] + "/"; //seat number (1-30) --> index (0-29)
	    voices = new Tone.MultiPlayer(
		[
		    url3.concat("do.mp3"),
		    url3.concat("re.mp3"),
		    url3.concat("mi.mp3"),
		    url3.concat("fa.mp3"),
		    url3.concat("sol.mp3"),
		    url3.concat("la.mp3"),
		    url3.concat("si.mp3"),
		    url3.concat("highdo.mp3"),
		    url3.concat("highre.mp3"),
		    url3.concat("highmi.mp3")
		]
	    ).toMaster();
	    break;
	default:
	    ;
	}
	
	//individual sound triggers
	var url4 = "audio/soundfiles/" + seatNo_str + ".mp3";
	mysound = new Tone.Player({ "url" : url4 }).toMaster();
	console.log(url4);

	//wait......
	Tone.Buffer.on("load", function(){
	    // changePage(pages['session1']);
	    changePage(pages['info']);
	}.bind(this));
	//-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    }

    //announcement audio
    socket.on('clap', function() {
	// console.log('clap');
	clap.start();
    });
    socket.on('54321', function() {
	console.log('54321');
	counting.start();
    });
    socket.on('intro', function() {
	console.log('intro');
	intro.start();
    });
    socket.on('brassband', function() {
	console.log('brassband');
	brassband.start();
    });
    socket.on('brassband-stop', function() {
	console.log('brassband-stop');
	brassband.stop();
    });
    
    //pagination
    $('.pagechgto1').click(function() {	changePage(pages['session1']); });
    $('.pagechgto2').click(function() {	changePage(pages['session2']); });
    $('.pagechgto3').click(function() {	changePage(pages['session3']); });
    
    //pagination (by network msg)
    socket.on('pagechg', function(msg) {
	switch(msg) {
	case '0':
	    changePage(pages['session1']);
	    break;
	case '1':
	    changePage(pages['session2']);
	    break;
	case '2':
	    changePage(pages['session3']);
	    break;
	default:
	    ;
	}
    });

    //// sound test page
    $('#soundtest').click(function() {
	clap.start();
    });
    $('#soundtest-next').click(function() {
	changePage(pages['session1']);
    });

    // player session #1
    $('#playbtn1').data('play_fn', function() { player1.start(); });
    $('#playbtn1').data('stop_fn', function() { player1.stop(); });
    $('#playbtn1').data('done_fn', function() {	return (player1.state == "stopped"); });

    // player session #2
    $('#playbtn2').data('play_fn', function() { player2.start(); });
    $('#playbtn2').data('stop_fn', function() { player2.stop(); });
    $('#playbtn2').data('done_fn', function() {	return (player2.state == "stopped"); });
    
    // player session #3 - mysound
    $('#playbtn3').data('play_fn', function() { mysound.start(); });
    $('#playbtn3').data('stop_fn', function() { mysound.stop(); });
    $('#playbtn3').data('done_fn', function() { return (mysound.state == "stopped"); });
    
    //sing-note (only for 'notes' people.
    socket.on('sing-note', function(note) {
	console.log(note);
	if (sounder_type == 'notes') {
	    switch(note) {
	    case '/C4':
		voices.start(0);
		break;
	    case '/D4':
		voices.start(1);
		break;
	    case '/E4':
		voices.start(2);
		break;
	    case '/F4':
		voices.start(3);
		break;
	    case '/G4':
		voices.start(4);
		break;
	    case '/A4':
		voices.start(5);
		break;
	    case '/B4':
		voices.start(6);
		break;
	    case '/C5':
		voices.start(7);
		break;
	    case '/D5':
		voices.start(8);
		break;
	    case '/E5':
		voices.start(9);
		break;
	    default:
		;
	    }
	}
    });

    // network-driven playall/stopall (UGLY, but let's bear with it. move on! next time!!)
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
	case 3:
	    if ($('#playbtn3').data('done_fn')() == false) {
		$('#playbtn3').click(); //stop
	    }
	    $('#playbtn3').click(); //start again
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
	case 3:
	    if ($('#playbtn3').data('done_fn')() == false) {
		player3.stop();
	    }
	    break;
	default:
	    ;
	}
    });
    
});

//
//// determine sounder type
//
// { construcion of the choir }
// 
// brass : 4
// tuba : 5
// flute : 3
// voice1 : 2
// voice2 : 2
// ..(3-8): (6x2=12)
// voice9 : 2
//
// total ==> 30 participants
//
// { mapping }
//
// places are mixed in the space. so, we will do random mix.
//
// { mapping code }
//
// function shuffle(array) { //==>http://stackoverflow.com/a/2450976
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {

// 	// Pick a remaining element...
// 	randomIndex = Math.floor(Math.random() * currentIndex);
// 	currentIndex -= 1;

// 	// And swap it with the current element.
// 	temporaryValue = array[currentIndex];
// 	array[currentIndex] = array[randomIndex];
// 	array[randomIndex] = temporaryValue;
//     }

//     return array;
// }
// var tracks = [
//     'brass','brass','brass','brass',
//     'tuba','tuba','tuba','tuba','tuba',
//     'flute','flute','flute',
//     'voice1','voice1',
//     'voice2','voice2',
//     'voice3','voice3',
//     'voice4','voice4',
//     'voice5','voice5',
//     'voice6','voice6',
//     'voice7','voice7',
//     'voice8','voice8',
//     'voice9','voice9'
// ];
// tracks = shuffle(tracks);
//
// {result}
// ["voice7", "brass", "flute", "voice4", "voice5", "voice2", "voice4", "tuba", "voice5", "voice9", "tuba", "voice8", "tuba", "flute", "voice2", "voice3", "voice3", "flute", "voice7", "brass", "voice8", "brass", "voice1", "voice6", "voice6", "voice1", "brass", "tuba", "voice9", "tuba"]
