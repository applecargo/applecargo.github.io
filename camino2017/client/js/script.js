var edel;

$( document ).ready(function() {
    
    $('.ui-btn').click(function() {
        $(this).removeClass('bg-blue').addClass('bg-yellow');
        setTimeout(function() {
            $(this).removeClass('bg-yellow').addClass('bg-blue');
        }.bind(this), 300);
    });
    
    $('.ui-tgl').change(function() {
	if ($(this).prop('checked') == true) {
	    $(this).removeClass('bg-near-black').addClass('bg-white');
	}
	else {
	    $(this).removeClass('bg-white').addClass('bg-near-black');
	}
    });

    var pages = {
        'page-welcome': 0,
        'page-sndcheck': 1,
        'page-netcheck': 2,
        'page-sounder': 3
    };

    var cur_page = 0;
    function changePage(page) {
        $('.ui-page:nth(' + cur_page + ')').hide();
        $('.ui-page:nth(' + page + ')').show();
        cur_page = page;
    }

    $('#go-sndcheck').click(function() {
        changePage(pages['page-sndcheck']);
        $('#pagestat').text('사운드 체크');
    });
    $('#go-netcheck').click(function() {
        changePage(pages['page-netcheck']);
        $('#pagestat').text('네트워크 체크');
    });
    $('#go-sounder').click(function() {
        changePage(pages['page-sounder']);
        $('#pagestat').text('사운드 켐페인');
    });

    var socket = io('http://52.78.239.112:5500');

    socket.on('connect', function() {

    	$('#netstat').prop('checked', true).change(); //don't forget to trigger evt, 'change'.

        socket.on('disconnect', function() {
    	    $('#netstat').prop('checked', false).change();
        });
    });

    //time sync
    var clock_offset = 0; //milli-sec
    function resyncClock(ctime) { clock_offset = ctime - Date.now(); }
    function getTimeNow() { return (Date.now()+clock_offset); }

    //audio data loading
    var url;
    //edelweiss band/voice proportion
    var edelweiss_mode = 'singer';
    if (Math.random() < 0.3) { edelweiss_mode = 'band'; }

    if (edelweiss_mode == 'band') {
	url = "audio/edelweiss/band@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
	var edelweiss_band = new Howl({ src: url, html5: true });
    }
    else if (edelweiss_mode == 'singer') {
	url = "audio/edelweiss/voice@9/" + Math.floor(Math.random()*9+1) + "/";
	var edelweiss_singer = [
	    new Howl({ src: url + "do.mp3", html5: true }),
	    new Howl({ src: url + "re.mp3", html5: true }),
	    new Howl({ src: url + "mi.mp3", html5: true }),
	    new Howl({ src: url + "fa.mp3", html5: true }),
	    new Howl({ src: url + "sol.mp3", html5: true }),
	    new Howl({ src: url + "la.mp3", html5: true }),
	    new Howl({ src: url + "si.mp3", html5: true }),
	    new Howl({ src: url + "highdo.mp3", html5: true }),
	    new Howl({ src: url + "highre.mp3", html5: true }),
	    new Howl({ src: url + "highmi.mp3", html5: true })
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

    //
    url = "audio/clap.wav";
    var clap = new Howl({ src: url, html5: true });
    //
    url = "audio/54321.mp3";
    var count = new Howl({ src: url, html5: true });
    //
    url = "audio/car-horn@10/" + ("0" + Math.floor(Math.random()*10+1)).slice(-2) + ".mp3";
    var carhorn = new Howl({ src: url, html5: true });
    //
    url = "audio/phonecall-cricket@30/" + ("0" + Math.floor(Math.random()*30+1)).slice(-2) + ".mp3";
    var phone = new Howl({ src: url, html5: true });
    //
    url = "audio/sea@9/" + ("0" + Math.floor(Math.random()*9+1)).slice(-2) + ".mp3";
    var sea = new Howl({ src: url, html5: true });
    //
    url = "audio/trk01@30/" + ("0" + Math.floor(Math.random()*30+1)).slice(-2) + ".mp3";
    var trk01 = new Howl({ src: url, html5: true });
    //
    url = "audio/watcher@5/" + ("0" + Math.floor(Math.random()*5+1)).slice(-2) + ".mp3";
    var watcher = new Howl({ src: url, html5: true });
    //
    url = "audio/machine@13/" + ("0" + Math.floor(Math.random()*13+1)).slice(-2) + ".mp3";
    var machine = new Howl({ src: url, html5: true });
    //
    url = "audio/bee@8/" + ("0" + Math.floor(Math.random()*8+1)).slice(-2) + ".mp3";
    var bee = new Howl({ src: url, html5: true });

    //unlocking sounds
    function unlock_sounds() {
	unlck = function(snd) { snd.play();snd.stop(); };
        unlck(clap);
        unlck(count);
        unlck(carhorn);
        unlck(phone);
        unlck(sea);
        unlck(trk01);
        unlck(watcher);
	unlck(machine);
	unlck(bee);
	//intentionally removing if-clauses..
	unlck(edelweiss_band);
	for (var i = 0; i < 10; i++) {
	    unlck(edelweiss_singer[i]);
	}
	// if (edelweiss_mode == 'band') { unlck(edelweiss_band); }
	// else if (edelweiss_mode == 'singer') {
	//     for (var i = 0; i < 10; i++) {
	// 	unlck(edelweiss_singer[i]);
	//     }
	// }
    }

    //sndcheck audio && unlock audio action
    var sound_unlocked = false;
    $('#clap').click(function() {
	//
        clap.play();
	
        //let's unlock all sounds.. with single touch!
	if (sound_unlocked == false) {
	    sound_unlocked = true;
	    unlock_sounds();
	}
    });
    
    //netcheck audio
    socket.on('clap', function() {
	clap.play();
    });
    
    //update system status
    socket.on('schedule', function(stat) {
        // console.log(stat);
	resyncClock(stat.ctime); //re-syncronize clock
	var now = getTimeNow(); //get server time

	//
	scheduler = function(prog) {
	    var stopat = (stat.sched_start + prog.duration()*1000);
	    if (stat.sched_start < now && now < stopat) {
                prog.play();
                prog.seek((now - stat.sched_start)/1000); //in seconds
                // setTimeout(function() { prog.stop() }, stopat - now); // schedule stop // disabled temporarily
	    }
	    else if (stat.sched_start > now) {
                setTimeout(function() { prog.play(); }, stat.sched_start - now); // schedule start.
                // setTimeout(function() { prog.stop() }, stopat - now); // schedule stop. // disabled temporarily
	    }
	};
	
	//// manage programs
	
	//
        if (stat.prog == 'carhorn') { scheduler(carhorn); $('#program').text('경적'); }
        if (stat.prog == 'phone')   { scheduler(phone); $('#program').text('전화'); }
        if (stat.prog == 'sea')     { scheduler(sea); $('#program').text('바다'); }
        if (stat.prog == 'trk01')   { scheduler(trk01); $('#program').text('track-01'); }
        if (stat.prog == 'watcher') { scheduler(watcher); $('#program').text('관객'); }
        if (stat.prog == 'machine') { scheduler(machine); $('#program').text('기계'); }
        if (stat.prog == 'bee')     { scheduler(bee); $('#program').text('벌떼'); }
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
	    clap.stop();
            count.stop();
            carhorn.stop();
            phone.stop();
            sea.stop();
            trk01.stop();
            watcher.stop();
	    machine.stop();
	    bee.stop();
	    edelweiss_band.stop();
	    $('#program').text('-');
	}

    });
    
    $('#unlock').click(function() {
	//
        clap.play();
	
        //let's unlock all sounds.. with single touch!
	unlock_sounds(); // this will also stop all.

	$('#program').text('-');

	//query schedule!
	socket.emit('query-schedule');
    });
    
});
	// console.log('server connected.');

	    // console.log('server disconnected.');


	    //you might want to stop all sounds here.......
            //if we trust.. pre-existing schedules!! yeah... might be good....... but.. if not, we might want to stop all, conservatively.

	//
	// [[[ NOTE ]]]
	//
	// by default,
	// socket.io client will try to re-connect 'infinity' number of times!
	//

	//
	// disconnection occurs according to server's heartbeat ping/pong setup. normally, this is not real-time at all.
	// ==> check how to tune the numbers. @ server code. now we using.. 1 sec ping/pong, 3 sec to give up.
	// (http://stackoverflow.com/a/31787022)
	//

		//do nothing. we will just trust setTimeouts in charge of stopping sounds.
		//but if needed, you might want to forse stop all sounds here.. (for TESTING session, for example)
		

        //
        // protocol (node.js server --(uni-direction)--> clients) :
        //
        // example stat) 'prog' == gymsession. / 'sched_start' == clock time / 'sched_stop' == clock time
        //
        // 1) if prog != 'wait' ==> check time. if prog == 'wait', then do nothing. all 'prog' sounds will stop naturally, no worries.
        // 2) if sched_start < Date.now() < sched_stop, then play and seek to right position with playertime value. and sched_stop!
        //    if sched_start > Date.now(), then sched_start && sched_stop!
        //    if Date.now() > sched_stop, then do nothing. we just lost the chance.
        //

	//DEBUG - time sync
	// $('#program').text(JSON.stringify(stat.sched_start/1000));
	// $('#program1').text(JSON.stringify(stat.sched_stop/1000));
	// $('#playtime').text(JSON.stringify(now/1000));
