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
	    $(this).removeClass('bg-near-black').addClass('bg-white');
	}
	else {
	    $(this).removeClass('bg-white').addClass('bg-near-black');
	}
    });
    // $('.ui-tgl:nth(0)').prop('checked', true).change(); //don't forget to trigger evt, 'change'.

    //pages set-list
    var pages = {
        'page-welcome': 0,
        'page-numbersel': 1,
        'page-sndcheck': 2,
        'page-netcheck': 3,
        'page-sounder': 4
    };

    //UI - page arbitrator
    var cur_page = 0;
    function changePage(page) {
        // $('.ui-page:nth(' + cur_page + ')').fadeOut(500);
        // $('.ui-page:nth(' + page + ')').fadeIn(500);
        $('.ui-page:nth(' + cur_page + ')').hide();
        $('.ui-page:nth(' + page + ')').show();
        cur_page = page;
    }

    //page changers
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
        $('#pagestat').text('사운드 행동');
    });

    // connect server
    var socket = io('http://52.78.239.112:5500'); // amazon aws ec2 node.js server

    socket.on('connect', function() {

	// console.log('server connected.');
        socket.emit('query-schedule');

	//indicator tick!
    	$('#netstat').prop('checked', true).change(); //don't forget to trigger evt, 'change'.

	//
	// [[[ NOTE ]]]
	//
	// by default,
	// socket.io client will try to re-connect 'infinity' number of times!
	//

	//
	// disconnection occurs according to server's heartbeat ping/pong setup. normally, this is not real-time at all.
	// ==> check how to tune the numbers. @ server code. now we using.. 1 sec ping/pong, 3 sec to give up.
	//
        socket.on('disconnect', function() {
	    // console.log('server disconnected.');
    	    $('#netstat').prop('checked', false).change(); //don't forget to trigger evt, 'change'.

	    //you might want to stop all sounds here.......
	    //if we trust.. pre-existing schedules!! yeah... might be good....... but.. if not, we might want to stop all, conservatively.
        });
    });
    
    //audio loading...
    var sounds_list = {
        'clap':0,
        'gymsession':1,
        'brass':2
    };
    
    var sounds = new Howl({
        src: [
            "audio/clap.wav",
            "audio/gymsession.mp3",
            "audio/brass.mp3"
        ],
        html5: true });

    //sndcheck audio
    $('#clap').click(function() {
        sounds[0].play();
    });
    
    //netcheck audio
    socket.on('clap', function() {
        sounds[0].play();
    });

    //update system status
    socket.on('schedule', function(stat) {
        console.log(stat);

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

        if (stat.prog == 'gymsession') { //schedule actions
            if (stat.sched_start < Date.now() && Date.now() < stat.sched_stop) {
                sounds.seek((Date.now() - stat.sched_start)/1000, sounds_list['gymsession']); //in seconds
                sounds.play(sounds_list['gymsession']);
                setTimeout(function() { sounds.stop(sounds_list['gymsession']]); }, stat.sched_stop - Date.now()); // schedule stop
            }
            else if (stat.sched_start > Date.now()) {
                setTimeout(function() { sounds.play(sounds_list['gymsession']]); }, stat.sched_start - Date.now()); // schedule start.
                setTimeout(function() { sounds.stop(sounds_list['gymsession']]); }, stat.sched_stop - Date.now()); // schedule stop.
            }
        }
        else if (stat.prog == 'brass') { // brass sounds
            if (stat.sched_start < Date.now() && Date.now() < stat.sched_stop) {
                sounds.seek((Date.now() - stat.sched_start)/1000,sounds_list['brass']]); //in seconds
                sounds.play(sounds_list['brass']);
                setTimeout(function() { sounds.stop([sounds_list['brass']); }, stat.sched_stop - Date.now()); // schedule stop
            }
            else if (stat.sched_start > Date.now()) {
                setTimeout(function() { sounds.play(sounds_list['brass']); }, stat.sched_start - Date.now()); // schedule start.
                setTimeout(function() { sounds.stop(sounds_list['brass']); }, stat.sched_stop - Date.now()); // schedule stop.
            }
        }
	else if (stat.prog == 'wait') { // wait & emergency stop
	    //do nothing. we will just trust setTimeouts in charge of stopping sounds.
	    //but if needed, you might want to forse stop all sounds here.. (for TESTING session, for example)
	    
	    //just stop every sounds!!
	    sounds.stop(sounds_list['gymsession']);
	    sounds.stop(sounds_list['brass']);
	}

	//update UI
	// $('#program').text();
	// $('#playtime').text();
    });
});
