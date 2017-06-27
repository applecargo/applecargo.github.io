$( document ).ready(function() {

    //overlay-ed flasher
    var flasher = new Flasher($('.flasher')[0], 2000);

    //network
    var socket = io('http://52.79.203.62:5500'); //temporal ip - amazon aws ec2 server
    var netstat = new Tgl($(".netstat")[0], 'bg-white', 'bg-near-black', null, null);
    socket.on('connect', function() {
	netstat.set();
	socket.on('disconnect', function() {
	    netstat.clear();
	});
    });

    //sound enabler (especially for iOS users/devices)
    var touch = new Btn($(".touch")[0], 'bg-white', 'bg-near-black', 300, function() {
	synth_beep.osc.frequency.value =
	    Tone.Frequency(Math.floor(Math.random()*12 + 72), "midi").toFrequency();
	synth_beep.start();
	// socket.emit('sound','touch'); // this will feed-forward forever. fun, but out of control.
    });
    //resolve covering issue..
    $('.flasher').click(function (){
	touch.click();
    });

    ////audio sample loading
    var boo = new Tone.MultiPlayer(
	[
	    "audio/boobab@3/01.wav",
	    "audio/boobab@3/02.wav",
	    "audio/boobab@3/03.wav"
	]
    ).toMaster();

    ////////audio
    ////beep-tone
    // var synth_beep = new Synth_beep();
    var synth_beep = new Synth_beepshift();

    ////noise
    var synth_whistle = new Synth_whistle();
    
    //program change by network msg.
    var program = 0;
    socket.on('sound', function(msg) {
	program = msg;
	console.log(program);
	$('.prog-no').text(program);
    });

    //programs
    function actioncallback(poser, posep, posey) {
	switch(program) {
	case 0:
	    //bang!
	    if (poser < 0.7) {
		if (posep < 0.5) {// snap, front
		    synth_whistle.filter.frequency.value =
			Tone.Frequency(Math.floor(Math.random()*12 + 72), "midi").toFrequency();
		    synth_whistle.start();
		}
		else {// snap, back
		    synth_whistle.stop();
		    synth_beep.osc.frequency.value =
			Tone.Frequency(Math.floor(Math.random()*12 + 72), "midi").toFrequency();
		    synth_beep.start();
		}
	    }
	    else {// waving
		synth_beep.osc.frequency.value =
			Tone.Frequency(Math.floor(Math.random()*12 + 72), "midi").toFrequency();
		synth_beep.start();
	    }
	    //screen bang!
	    flasher.flash();
	    break;
	    //bang
	    break;
	case 1:
	    //bang!
	    if (poser < 0.7) {
		if (posep < 0.5) {// snap, front
		    boo.start(0);
		}
		else {// snap, back
		    boo.start(1);
		}
	    }
	    else {// waving
		boo.start(2);
	    }
	    //screen bang!
	    flasher.flash();
	    break;
	case 2:
	    flasher.flash();
	    break;
	default:
	    ;
	}
    }

    //// motion capture
    //refer --> motion.js
    motionprocessing(actioncallback);

    var ws_poser = new Webscope($('.ws_poser')[0], -2, 2, 300);
    var ws_posey = new Webscope($('.ws_posey')[0], -2, 2, 300);
    var ws_motionr = new Webscope($('.ws_motionr')[0], -2, 2, 300);
    var ws_tiltsy = new Webscope($('.ws_tiltsy')[0], -2, 2, 300);
    var motionscope = setInterval(function() {
	ws_poser.update(g_poser);
	ws_posey.update(g_posey);
	ws_motionr.update(Math.abs(g_motionr));
	ws_tiltsy.update(Math.abs(g_tiltsy));
    }, 50);
});
