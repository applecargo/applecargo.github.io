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
    
    //(on server) msg. routing..
    // socket.on('54321-all',        function() { ioInst.emit('54321'); });
    // socket.on('10meg-all',        function() { ioInst.emit('10meg'); });
    // socket.on('ansanintro-all',   function() { ioInst.emit('ansanintro'); });
    // socket.on('citizenintro-all', function() { ioInst.emit('citizenintro'); });
    // socket.on('clap-all',         function() { ioInst.emit('clap'); });
    // socket.on('enablespk-all',    function() { ioInst.emit('enablespk'); });
    // socket.on('enablespk-w-all',  function() { ioInst.emit('enablespk-w'); });
    // socket.on('maxvol-d-all',     function() { ioInst.emit('maxvol-d'); });
    // socket.on('maxvol-w-all',     function() { ioInst.emit('maxvol-w'); });
    // socket.on('playhelp-all',     function() { ioInst.emit('playhelp'); });
    // socket.on('spkon-all',        function() { ioInst.emit('spkon'); });
    // socket.on('spkon-slow-all',   function() { ioInst.emit('spkon-slow'); });
    // socket.on('spkon-w-all',      function() { ioInst.emit('spkon-w'); });
    // socket.on('trybutton-w-all',  function() { ioInst.emit('trybutton-w'); });
    // socket.on('webpage2-w-all',   function() { ioInst.emit('webpage2-w'); });
    // socket.on('webpage-w-all',    function() { ioInst.emit('webpage-w'); });

    //instant clap all! (announcements)
    $('#54321-all').click(function() { socket.emit('54321-all'); });
    $('#10meg-all').click(function() { socket.emit('10meg-all'); });
    $('#ansanintro-all').click(function() { socket.emit('ansanintro-all'); });
    $('#citizenintro-all').click(function() { socket.emit('citizenintro-all'); });
    $('#clap-all').click(function() { socket.emit('clap-all'); });
    $('#enablespk-all').click(function() { socket.emit('enablespk-all'); });
    $('#enablespk-w-all').click(function() { socket.emit('enablespk-w-all'); });
    $('#maxvol-d-all').click(function() { socket.emit('maxvol-d-all'); });
    $('#maxvol-w-all').click(function() { socket.emit('maxvol-w-all'); });
    $('#playhelp-all').click(function() { socket.emit('playhelp-all'); });
    $('#spkon-all').click(function() { socket.emit('spkon-all'); });
    $('#spkon-slow-all').click(function() { socket.emit('spkon-slow-all'); });
    $('#spkon-w-all').click(function() { socket.emit('spkon-w-all'); });
    $('#trybutton-w-all').click(function() { socket.emit('trybutton-w-all'); });
    $('#webpage2-w-all').click(function() { socket.emit('webpage2-w-all'); });
    $('#webpage-w-all').click(function() { socket.emit('webpage-w-all'); });

    //emergency stop! - when you want to cancel immediately.
    $('#stop-all').click(function() {
	socket.emit('schedule', { 'prog':'wait' });
    });

    //scheduling
    scheduler = function(prog_name) {
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
    $('#tuba').click(function() { scheduler('tuba'); });
    $('#bell').click(function() { scheduler('bell'); });
    $('#edelweiss-band').click(function() { scheduler('edelweiss-band'); });
});    
