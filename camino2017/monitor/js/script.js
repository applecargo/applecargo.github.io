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

    //UI - btn-netstat
    //multiple binding is allowed in jquery : http://stackoverflow.com/a/4951426
    $('.ui-btn-netstat').click(function() {
        $(this).removeClass('bg-near-black').addClass('bg-white');
        setTimeout(function() {
            $(this).removeClass('bg-white').addClass('bg-near-black');
        }.bind(this), 300);
    });
    // $('.ui-btn').click();

    // connect server
    var socket = io('http://52.78.239.112:5700'); // amazon aws ec2 node.js server

    socket.on('connect', function() {
	console.log('connected');
        socket.on('disconnect', function() { console.log('disconnected'); });
    });
    
    //instant clap all!
    $('#clap-all').click(function() {
	console.log('clap-all');
	socket.emit('clap-all');
    });

    //emergency stop! - when you want to cancel immediately.
    $('#stop-all').click(function() {
	socket.emit('schedule', {
	    'prog':'wait',
	    'sched_start':0,
	    'sched_stop':0
	});
    });

    //you can bang twice!!
    $('#flowers').click(function() {
	//post a schedule
	var startdelay = 5000; // in ms
	var sound_duration = 25000; //in ms
	//
	var sched_start = (Date.now()+startdelay);
	var sched_stop = (Date.now()+startdelay+sound_duration);
	
	socket.emit('schedule', {
	    'prog':'flowers',
	    'sched_start':sched_start,
	    'sched_stop':sched_stop
	});
    });
});    
