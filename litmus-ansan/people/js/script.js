//birthday-go
//time generator
//1 1 2 2 2 4 1 1 2 2 2 4 1 1 2 2 2 2 4 1 1 2 2 2 4 //rhythm
//0 0 1 0 3 2 0 0 1 0 4 3 0 0 7 5 3 2 1 6 6 5 3 4 3 //melody
function bd_tgen() {
    var bd_r = [1, 1, 2, 2, 2, 4, 1, 1, 2, 2, 2, 4, 1, 1, 2, 2, 2, 2, 4, 1, 1, 2, 2, 2, 4]; //rhythm
    var bd_tscale = 500; //ms
    var sum = 0;
    
    for (var i = 0; i < 25; i++) {
	// console.log(bd_r[i]*bd_tscale);
	console.log(sum);
	sum = sum + bd_r[i]*bd_tscale;
    }
}

$( document ).ready(function() {

    ////ui utilities
    
    $('.ui-btn').click(function() {
        $(this).removeClass('bg-blue').addClass('bg-yellow');
        setTimeout(function() {
            $(this).removeClass('bg-yellow').addClass('bg-blue');
        }.bind(this), 300);
    });
    
    $('.ui-btn-piano-white').click(function() {
        $(this).removeClass('fill-white').addClass('fill-yellow');
        setTimeout(function() {
            $(this).removeClass('fill-yellow').addClass('fill-white');
        }.bind(this), 300);
    });
    $('.ui-btn-piano-white').addClass('fill-white');
    
    $('.ui-tgl').change(function() {
	if ($(this).prop('checked') == true) {
	    $(this).removeClass('bg-near-black').addClass('bg-white');
	}
	else {
	    $(this).removeClass('bg-white').addClass('bg-near-black');
	}
    });

    ////paginations
    
    var pages = {
        'page-welcome': 0,
        'page-loading': 1,
        'page-checklist': 2,
        'page-launchpad': 3,
        'page-piano': 4
    };
    var cur_page = 0;
    function changePage(page) {
        $('.ui-page:nth(' + cur_page + ')').hide();
        $('.ui-page:nth(' + page + ')').show();
        cur_page = page;
    }
    $('.go-checklist').click(function() { changePage(pages['page-checklist']); });
    $('.go-launchpad').click(function() { changePage(pages['page-launchpad']); });
    $('.go-piano').click(function() { changePage(pages['page-piano']); });
    var pagechanger = setTimeout(function() { $('#go-loading').click(); }, 5000);
    $('.go-loading').click(function() {
        changePage(pages['page-loading']);
	audioloader();
	clearTimeout(pagechanger);
    });

    ////audio data loading

    var clap;
    
    function audioloader() {
	var url;

	//voices
	url = "audio/voices/voice@10/" + Math.floor(Math.random()*10+1) + "/";
	singer = new Tone.MultiPlayer(
	    [
		url.concat("do.mp3"),
		url.concat("re.mp3"),
		url.concat("mi.mp3"),
		url.concat("fa.mp3"),
		url.concat("sol.mp3"),
		url.concat("la.mp3"),
		url.concat("si.mp3"),
		url.concat("highdo.mp3"),
		url.concat("highre.mp3"),
		url.concat("highmi.mp3")
	    ]
	).toMaster();

	// //
	// url = "audio/voices/individual@12/" + ("0" + Math.floor(Math.random()*12+1)).slice(-2) + ".mp3";
	// indi = new Tone.Player({ "url" : url }).toMaster();

	//sounds
	url = "audio/clap.wav";         clap         = new Tone.Player({ "url" : url }).toMaster();

	//buffering
	console.log('buffering started');
	Tone.Buffer.on("load", function(){
	    console.log('buffering done');
            changePage(pages['page-checklist']);
	}.bind(this));
	//-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/

	////sensor triggered effects
	
	// window.addEventListener("deviceorientation", function(event) {
	//     clap.playbackRate = (event.alpha-180)/180 + 1; //orientation
	// }, false);
	window.addEventListener("devicemotion", function(event) {
	    var ax = event.accelerationIncludingGravity.x;
	    var ay = event.accelerationIncludingGravity.y;
	    var az = event.accelerationIncludingGravity.z;
	    var dist = Math.sqrt(ax*ax + ay*ay + az*az) - 9.8; // 2-norm minus gravity
	    // clap.playbackRate = dist + 1; //motion?? how to apply effects??
	}, false);
    }

    ////local sounds (ui-triggered)
    
    //sndcheck audio
    $('.ui-clap').click(function() {
        clap.start();
    });
    
    //sing-note by me.
    $('.piano-do').click(function() { singer.start(0); });
    $('.piano-re').click(function() { singer.start(1); });
    $('.piano-mi').click(function() { singer.start(2); });
    $('.piano-fa').click(function() { singer.start(3); });
    $('.piano-sol').click(function() { singer.start(4); });
    $('.piano-la').click(function() { singer.start(5); });
    $('.piano-si').click(function() { singer.start(6); });
    $('.piano-highdo').click(function() { singer.start(7); });
    $('.piano-highre').click(function() { singer.start(8); });
    $('.piano-highmi').click(function() { singer.start(9); });

    ////----------------------------------------------------------------////
    
    ////connect to message server
    
    var socket = io('http://13.124.127.189:5500');
    socket.on('connect', function() {
    	$('#netstat').prop('checked', true).change(); //don't forget to trigger evt, 'change'.
        socket.on('disconnect', function() {
    	    $('#netstat').prop('checked', false).change();
        });
    });

    ////sound swarm TX (message-triggering)

    //launchpads
    $('.clap-go').click(function() {
	socket.emit('sound', 'clap'); //won't come back. (broadcast without myself)
	clap.start(); // to re-activate sound outputs when needed!!
	console.log('clap-go');
    });
    
    //birthday-go (network)
    //1 1 2 2 2 4 1 1 2 2 2 4 1 1 2 2 2 2 2 1 1 2 2 2 4 //rhythm
    //0 0 1 0 3 2 0 0 1 0 4 3 0 0 7 5 3 2 1 6 6 5 3 4 3 //melody
    var bday_timers = [];
    $('.birthday-go').click(function() {
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); }, 0));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); }, 500));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/D4'); }, 1000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); }, 2000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); }, 3000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/E4'); }, 4000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); }, 6000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); }, 6500));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/D4'); }, 7000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); }, 8000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/G4'); }, 9000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); }, 10000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); }, 12000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C4'); }, 12500));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/C5'); }, 13000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/A4'); }, 14000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); }, 15000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/E4'); }, 16000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/D4'); }, 17000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/B4'); }, 19000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/B4'); }, 19500));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/A4'); }, 20000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); }, 21000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/G4'); }, 22000));
	bday_timers.push(setTimeout(function() { socket.emit('sing-note', '/F4'); }, 23000));
    	//done! clear array.
    	bday_timers.push(setTimeout(function() { bday_timers = []; }, 25000));
    });
    
    ////sound swarm RX (message-triggered)
    
    //sing-note from network
    socket.on('sing-note', function(note) {
	console.log(note);
	switch(note) {
	case '/C4': singer.start(0); break;
	case '/D4': singer.start(1); break;
	case '/E4': singer.start(2); break;
	case '/F4': singer.start(3); break;
	case '/G4': singer.start(4); break;
	case '/A4': singer.start(5); break;
	case '/B4': singer.start(6); break;
	case '/C5': singer.start(7); break;
	case '/D5': singer.start(8); break;
	case '/E5': singer.start(9); break;
	default:
	    ;
	}
    });

    //sound from network
    socket.on('sound', function(msg) {
	switch(msg) {
	case 'clap': clap.start(); break;
	// case 'clap': clap.start(); break;
	default:
	    ;
	}
    });
});


// //birthday-go (local)
// //1 1 2 2 2 4 1 1 2 2 2 4 1 1 2 2 2 2 2 1 1 2 2 2 4 //rhythm
// //0 0 1 0 3 2 0 0 1 0 4 3 0 0 7 5 3 2 1 6 6 5 3 4 3 //melody
// var bday_timers = [];
// $('.birthday-go').click(function() {
// 	bday_timers.push(setTimeout(function() { singer.start(0); }, 0));
// 	bday_timers.push(setTimeout(function() { singer.start(0); }, 500));
// 	bday_timers.push(setTimeout(function() { singer.start(1); }, 1000));
// 	bday_timers.push(setTimeout(function() { singer.start(0); }, 2000));
// 	bday_timers.push(setTimeout(function() { singer.start(3); }, 3000));
// 	bday_timers.push(setTimeout(function() { singer.start(2); }, 4000));
// 	bday_timers.push(setTimeout(function() { singer.start(0); }, 6000));
// 	bday_timers.push(setTimeout(function() { singer.start(0); }, 6500));
// 	bday_timers.push(setTimeout(function() { singer.start(1); }, 7000));
// 	bday_timers.push(setTimeout(function() { singer.start(0); }, 8000));
// 	bday_timers.push(setTimeout(function() { singer.start(4); }, 9000));
// 	bday_timers.push(setTimeout(function() { singer.start(3); }, 10000));
// 	bday_timers.push(setTimeout(function() { singer.start(0); }, 12000));
// 	bday_timers.push(setTimeout(function() { singer.start(0); }, 12500));
// 	bday_timers.push(setTimeout(function() { singer.start(7); }, 13000));
// 	bday_timers.push(setTimeout(function() { singer.start(5); }, 14000));
// 	bday_timers.push(setTimeout(function() { singer.start(3); }, 15000));
// 	bday_timers.push(setTimeout(function() { singer.start(2); }, 16000));
// 	bday_timers.push(setTimeout(function() { singer.start(1); }, 17000));
// 	bday_timers.push(setTimeout(function() { singer.start(6); }, 19000));
// 	bday_timers.push(setTimeout(function() { singer.start(6); }, 19500));
// 	bday_timers.push(setTimeout(function() { singer.start(5); }, 20000));
// 	bday_timers.push(setTimeout(function() { singer.start(3); }, 21000));
// 	bday_timers.push(setTimeout(function() { singer.start(4); }, 22000));
// 	bday_timers.push(setTimeout(function() { singer.start(3); }, 23000));
// 	//done! clear array.
// 	bday_timers.push(setTimeout(function() { bday_timers = []; }, 25000));
// });

