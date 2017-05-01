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
	    src: [ url3 ]
	});
	
    // }

    $('#playbtn1').click(function() {
	tonejs_player.start();
    });
    
    $('#playbtn2').click(function() {
	howler_player.play();
    });
    
    $('#playbtn3').click(function() {
	;
    });
    
});
