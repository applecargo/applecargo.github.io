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
        'page-numbersel': 1,
        'page-sndcheck': 2,
        'page-netcheck': 3,
        'page-sounder': 4
    };

    var cur_page = 0;
    function changePage(page) {
        $('.ui-page:nth(' + cur_page + ')').hide();
        $('.ui-page:nth(' + page + ')').show();
        cur_page = page;
    }

    $('#go-numbersel').click(function() {
        changePage(pages['page-numbersel']);
        $('#pagestat').text('번호 선택');
    });
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
    var clap = new Howl({ src: "audio/clap.wav", html5: true });
    var flowers = new Howl({ src: "audio/brass.mp3", html5: true });

    //unlocking sounds
    function unlock_sounds() {
	unlck = function(snd) { snd.play();snd.stop(); };
        unlck(clap);
        unlck(flowers);
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

	//// manage programs
	// program #1 : 썰매장 가는 길
        if (stat.prog == 'flowers') {
	    var stopat = (stat.sched_start + flowers.duration()*1000);
	    if (stat.sched_start < now && now < stopat) {
                flowers.play();
                flowers.seek((now - stat.sched_start)/1000); //in seconds
                setTimeout(function() { flowers.stop() }, stopat - now); // schedule stop
	    }
	    else if (stat.sched_start > now) {
                setTimeout(function() { flowers.play(); }, stat.sched_start - now); // schedule start.
                setTimeout(function() { flowers.stop() }, stopat - now); // schedule stop.
	    }
        }
	else if (stat.prog == 'wait') {
	    //just stop every sounds!!
	    flowers.stop();
	}
	//
	$('#program').text('썰매장 가는 길');
    }
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
