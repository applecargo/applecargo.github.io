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
    
    //[[[NOTE]]]
    //IMPLEMENTATION of following.. 'playbtn' for interactive inline SVG element is very interesting..
    //BUT.. jquery dropped support for 'changeData' event.. so we cannot further make things better..
    //SO.. just bear with it. (and bear with 'network triggering' case below.. no way to trigger more nicely!!)
    //MAYBE.. will be better way to do this.. NOT using(relying on) jquery!
    
    //UI - playbtn (an interactive jquery controlled inline SVG button)
    $('.ui-playbtn').click(function() {
	if ($(this).data('state') == 'stopped') {
	    $(this).data('state', 'playing');
	    $(this).find('.play').hide();
	    $(this).find('.stop').show();
	    $(this).data('play_fn')();
	    //check player's state
	    var p1id = setInterval(function() {
    		if($(this).data('done_fn')() == true) {
		    $(this).data('state', 'stopped');
		    $(this).find('.play').show();
		    $(this).find('.stop').hide();
    		    clearInterval(p1id);
    		}
	    }.bind(this), 500);
	} else 	if ($(this).data('state') == 'playing') {
	    $(this).data('state', 'stopped');
	    $(this).find('.play').show();
	    $(this).find('.stop').hide();
	    $(this).data('stop_fn')();
	}
    });
    $('.ui-playbtn').data('state', 'stopped');
    $('.ui-playbtn .play').show();
    $('.ui-playbtn .stop').hide();
    // $('.ui-playbtn').data('play_fn', function() { console.log('play_fn'); }); // utillize callback functions!!
    // $('.ui-playbtn').data('stop_fn', function() { console.log('stop_fn'); }); // utillize callback functions!!
    // $('.ui-playbtn').data('done_fn', function() { console.log('done_fn'); }); // utillize callback functions!!
    
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
    
    //pages set-list
    var pages = {
	'playtest': 0,
	'loading': 1
    };

    //UI - page arbitrator
    var cur_page = 0;
    function changePage(page) {
	$('.ui-page:nth(' + cur_page + ')').fadeOut(500);
	$('.ui-page:nth(' + page + ')').fadeIn(500);
	cur_page = page;
    }

    //------------------------------------------------------------------------------------------------------------------------------//

    //download audio data
    var tonejs_player;
    var howler_player;
    var phono_player; // no idea?
    
    // function audioloader() {

	var url3 = "audio/edelweiss/brass.mp3";

	//// tonejs player
	tonejs_player = new Tone.Player({ "url" : url3 }).toMaster();
	Tone.Buffer.on("load", function(){
	    console.log('tonejs_player buffer loading done.');
	}); //.bind(this)); //-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/

	//// howler player
	var howler_player = new Howl({
	    src: [ url3 ], html5: true
	});
	
    // }

    $('#playbtn1').data('play_fn', function() { tonejs_player.start(); }); // utillize callback functions!!
    $('#playbtn1').data('stop_fn', function() { tonejs_player.stop(); }); // utillize callback functions!!
    $('#playbtn1').data('done_fn', function() {	return (tonejs_player.state == "stopped"); });
    
    $('#playbtn2').data('play_fn', function() { howler_player.play(); }); // utillize callback functions!!
    $('#playbtn2').data('stop_fn', function() { howler_player.stop(); }); // utillize callback functions!!
    $('#playbtn2').data('done_fn', function() {	return howler_player.playing(); });
    
});
