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
	    $(this).removeClass('bg-green').addClass('bg-red');
	}
	else {
	    $(this).removeClass('bg-red').addClass('bg-green');
	}
    });
    // $('.ui-tgl:nth(0)').prop('checked', true).change(); //don't forget to trigger evt, 'change'.
    
    ////individual acts

    //instant clap all!
    $('#clap-all').click(function() {
	console.log('clap-all');
	socket.emit('clap-all');
    });

    //periodic clap all-s
    $('#clap-tgl').click(function () {
	if ($(this).prop('checked') == true) {
	    var id = setInterval(function() {
		$('#clap-all').click();
		if($(this).prop('checked') == false) {
		    clearInterval(id);
		}
	    }.bind(this), 2000);
	}
    });

    //control server's action stage
    $('#act-prev').click(function() {
	socket.emit('act-prev');
    });
    $('#act-next').click(function() {
	socket.emit('act-next');
    });
    
    //// server inter-action!
    
    // var socket = io('http://52.78.239.112:5300'); // amazonaws ec2 node.js server
    var socket = io('http://localhost:5300'); // localhost testing..

    //
    socket.on('connect', function() {
	
    });

    //get & update server stat.
    socket.on('stat', function(data){
	
	//rollcnt
	$("#rollcnt").text(data.rollcnt);

	//actstage
	if (data.actstage >= 0 && data.actstage < 5) {
	    for (var i = 0; i < 5; i++) {
    		$('.act-tgl:nth(' + i + ')').prop('checked', (data.actstage == i)).change(); //don't forget to trigger evt, 'change'.
	    }
	}
	
	//seatstat
    	for (var i = 0; i < data.seats.length; i++) {
    	    $(".seats:nth(" + i + ")").prop("checked", data.seats[i]).change();
	}
    });

    //
    socket.on('disconnect', function() {
	
    });
});
