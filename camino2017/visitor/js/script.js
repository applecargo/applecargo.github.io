$( document ).ready(function() {
    
    $('.ui-tgl').change(function() {
	if ($(this).prop('checked') == true) {
	    $(this).removeClass('bg-near-black').addClass('bg-white');
	}
	else {
	    $(this).removeClass('bg-white').addClass('bg-near-black');
	}
    });

    var socket = io('http://52.78.239.112:5500');

    socket.on('connect', function() {

    	$('#netstat').prop('checked', true).change(); //don't forget to trigger evt, 'change'.

        socket.on('disconnect', function() {
    	    $('#netstat').prop('checked', false).change();
        });
    });

    //audio data loading
    var url;
    //edelweiss band/voice proportion
    var edelweiss_mode = 'singer';
    if (Math.random() < 0.4) { edelweiss_mode = 'band'; } // band is 40%

    if (edelweiss_mode == 'band') {
	url = "audio/edelweiss/band@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
	var edelweiss_band = new Howl({ src: url, html5: false });
    }
    else if (edelweiss_mode == 'singer') {
	url = "audio/edelweiss/voice@9/" + Math.floor(Math.random()*9+1) + "/";
	var edelweiss_singer = [
	    new Howl({ src: url + "do.mp3", html5: false }),
	    new Howl({ src: url + "re.mp3", html5: false }),
	    new Howl({ src: url + "mi.mp3", html5: false }),
	    new Howl({ src: url + "fa.mp3", html5: false }),
	    new Howl({ src: url + "sol.mp3", html5: false }),
	    new Howl({ src: url + "la.mp3", html5: false }),
	    new Howl({ src: url + "si.mp3", html5: false }),
	    new Howl({ src: url + "highdo.mp3", html5: false }),
	    new Howl({ src: url + "highre.mp3", html5: false }),
	    new Howl({ src: url + "highmi.mp3", html5: false })
	];
	
	//sing-note (only for 'notes' people.
	socket.on('sing-note', function(note) {
	    console.log(note);
	    switch(note) {
	    case '/C4':
		edelweiss_singer[0].play();
		break;
	    case '/D4':
		edelweiss_singer[1].play();
		break;
	    case '/E4':
		edelweiss_singer[2].play();
		break;
	    case '/F4':
		edelweiss_singer[3].play();
		break;
	    case '/G4':
		edelweiss_singer[4].play();
		break;
	    case '/A4':
		edelweiss_singer[5].play();
		break;
	    case '/B4':
		edelweiss_singer[6].play();
		break;
	    case '/C5':
		edelweiss_singer[7].play();
		break;
	    case '/D5':
		edelweiss_singer[8].play();
		break;
	    case '/E5':
		edelweiss_singer[9].play();
		break;
	    default:
		;
	    }
	});
    }

    url = "audio/edelweiss/individual@11/" + ("0" + Math.floor(Math.random()*11+1)).slice(-2) + ".mp3";
    var indi = new Howl({ src: url, html5: false });

    //announcements
    url = "audio/clap.wav";
    var clap = new Howl({ src: url, html5: false });
    //
    url = "audio/54321.mp3";
    var count = new Howl({ src: url, html5: false });

    //individual players
    var indi_timeout;
    $('#playbtn').click(function() {
	if (indi.playing()) {
	    indi.stop();
	    clearInterval(indi_timeout);
	}
    	indi.play();
	$(this).find('.play').hide();
	$(this).find('.stop').show();
	indi_timeout = setInterval(function() {
	    if (indi.playing()==false) {
		$(this).find('.stop').hide();
		$(this).find('.play').show();
		clearInterval(indi_timeout);
		console.log(2);
	    }
	}.bind(this), 500);
    });
    $('#playbtn .play').show();
    $('#playbtn .stop').hide();
    
    //net msg.
    socket.on('clap', function() {
	clap.play();
    });
    
    socket.on('54321', function() {
	count.play();
    });

    //get Q signals..
    socket.on('schedule', function(stat) {
	//
	scheduler = function(prog) { prog.play(); };
	
	//// manage programs
	
	//
        if (stat.prog == 'edelweiss-band') {
	    if (edelweiss_mode == 'band') {
		scheduler(edelweiss_band);
		$('#program').text('에델바이스-밴드');
	    }
	    else if (edelweiss_mode == 'singer') {
		//singers are always active!
		$('#program').text('에델바이스-싱어');
	    }
	}

	// stop all!!
	else if (stat.prog == 'wait') {
	    //announcements
	    clap.stop();
            count.stop();
	    //
	    if (edelweiss_mode == 'band') {
		edelweiss_band.stop();
	    }
	    $('#program').text('-');
	}

    });
});
