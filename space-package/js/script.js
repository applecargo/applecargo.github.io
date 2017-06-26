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
	osc.frequency.value = Math.random()*1400 + 200;
	ampEnv.triggerAttackRelease(0.4);
	osc.start();
	// socket.emit('sound','touch'); // this will feed-forward forever. fun, but out of control.
    });
    //resolve covering issue..
    $('.flasher').click(function (){
	touch.click();
    });

    //audio sample loading
    var boo = new Tone.MultiPlayer(
	[
	    "audio/boobab@3/01.wav",
	    "audio/boobab@3/02.wav",
	    "audio/boobab@3/03.wav"
	]
    ).toMaster();

    //audio
    var ampEnv = new Tone.AmplitudeEnvelope({
    	"attack": 0.1,
    	"decay": 0.3,
    	"sustain": 0,
    	"release": 0
    }).toMaster();

    var osc = new Tone.Oscillator(440, "sine").connect(ampEnv);
    osc.start();
    
    //program change by network msg.
    var program = 0;
    socket.on('sound', function(msg) {
	program = msg;
	console.log(program);
	$('.prog-no').text(program);
    });

    //programs
    function actioncallback() {
	switch(program) {
	case 0:
	    //bang
	    osc.frequency.value = Math.random()*1400 + 200;
	    ampEnv.triggerAttackRelease(0.4);
	    flasher.flash();
	    break;
	case 1:
	    //bang
	    boo.start(Math.floor(Math.random()*2));
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
});
