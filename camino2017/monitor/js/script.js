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

    //instant 54321 all!
    $('#54321-all').click(function() {
	console.log('54321-all');
	socket.emit('54321-all');
    });

    //emergency stop! - when you want to cancel immediately.
    $('#stop-all').click(function() {
	// socket.emit('schedule', {
	//     'prog':'wait',
	//     'sched_start':0,
	//     'sched_stop':0
	// });
	socket.emit('schedule', { 'prog':'wait' });
    });

    //scheduling
    
    //you can bang twice!!
    // var startdelay_def = 3000; // in ms, default start delay time 3 sec.

    scheduler = function(prog_name) {
	// //post a schedule
	// var sched_start = ( Date.now() + startdelay_def );
	// var sched_stop = 0; // play once till the end
	
	// socket.emit('schedule', {
	//     'prog':prog_name,
	//     'sched_start':sched_start,
	//     'sched_stop':sched_stop
	// });
	socket.emit('schedule', { 'prog':prog_name });
    }
    
    $('#carhorn').click(function() { scheduler('carhorn'); });
    $('#phone').click(function() { scheduler('phone'); });
    $('#cricket').click(function() { scheduler('cricket'); });
    $('#train').click(function() { scheduler('train'); });
    $('#brassball').click(function() { scheduler('brassball'); });
    $('#sea').click(function() { scheduler('sea'); });
    $('#trk01').click(function() { scheduler('trk01'); });
    $('#watcher').click(function() { scheduler('watcher'); });
    $('#machine').click(function() { scheduler('machine'); });
    $('#bee').click(function() { scheduler('bee'); });
    $('#edelweiss-band').click(function() { scheduler('edelweiss-band'); });
});    
