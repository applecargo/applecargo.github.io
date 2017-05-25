$( document ).ready(function() {
    
    $('.ui-btn').click(function() {
        $(this).removeClass('bg-blue').addClass('bg-yellow');
        setTimeout(function() {
            $(this).removeClass('bg-yellow').addClass('bg-blue');
        }.bind(this), 300);
    });
    
    $('.ui-btn-piano-white').click(function() {
        $(this).removeClass('fill-white').addClass('fill-yellow');
        setTimeout(function() {
            $(this).removeClass('fill-yellow').addClass('fill-white');
        }.bind(this), 300);
    });
    $('.ui-btn-piano-white').addClass('fill-white');
    
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
        'page-loading': 1,
        'page-checklist': 2,
        'page-launchpad': 3,
        'page-piano': 4
    };

    var cur_page = 0;
    function changePage(page) {
        $('.ui-page:nth(' + cur_page + ')').hide();
        $('.ui-page:nth(' + page + ')').show();
        cur_page = page;
    }

    $('.go-checklist').click(function() {
        changePage(pages['page-checklist']);
    });
    $('.go-launchpad').click(function() {
        changePage(pages['page-launchpad']);
    });
    $('.go-piano').click(function() {
        changePage(pages['page-piano']);
    });
    var pagechanger = setTimeout(function() {
	$('#go-loading').click();
    }, 5000);
    $('.go-loading').click(function() {
        changePage(pages['page-loading']);
	audioloader();
	clearTimeout(pagechanger);
    });

    var socket = io('http://13.124.127.189:5500');

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

    //// audio data loading
    
    var indi;
    function audioloader() {
	var url;

	url = "audio/edelweiss/voice@10/" + Math.floor(Math.random()*10+1) + "/";
	edelweiss_singer = new Tone.MultiPlayer(
	    [
		url.concat("do.mp3"),
		url.concat("re.mp3"),
		url.concat("mi.mp3"),
		url.concat("fa.mp3"),
		url.concat("sol.mp3"),
		url.concat("la.mp3"),
		url.concat("si.mp3"),
		url.concat("highdo.mp3"),
		url.concat("highre.mp3"),
		url.concat("highmi.mp3")
	    ]
	).toMaster();
	
	//
	url = "audio/edelweiss/individual@12/" + ("0" + Math.floor(Math.random()*12+1)).slice(-2) + ".mp3";
	indi = new Tone.Player({ "url" : url }).toMaster();

	//announcements
	url = "audio/clap.wav";         clap         = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/54321.mp3";        count        = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/10meg.mp3";        meg10        = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/ansanintro.mp3";   ansanintro   = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/citizenintro.mp3"; citizenintro = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/enablespk.mp3";    enablespk    = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/enablespk-w.mp3";  enablespk_w  = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/maxvol-d.mp3";     maxvol_d     = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/maxvol-w.mp3";     maxvol_w     = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/playhelp.mp3";     playhelp     = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/spkon.mp3";        spkon        = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/spkon-slow.mp3";   spkon_slow   = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/spkon-w.mp3";      spkon_w      = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/trybutton-w.mp3";  trybutton_w  = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/webpage2-w.mp3";   webpage2_w   = new Tone.Player({ "url" : url }).toMaster();
	url = "audio/webpage-w.mp3";    webpage_w    = new Tone.Player({ "url" : url }).toMaster();

	console.log('start');
	//wait......
	Tone.Buffer.on("load", function(){
	    console.log('done');
            changePage(pages['page-checklist']);
	}.bind(this));
	//-->resolve scoping issues.. : https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
    }

    //sing-note only me.
    $('.piano-do').click(function() { edelweiss_singer.start(0); });
    $('.piano-re').click(function() { edelweiss_singer.start(1); });
    $('.piano-mi').click(function() { edelweiss_singer.start(2); });
    $('.piano-fa').click(function() { edelweiss_singer.start(3); });
    $('.piano-sol').click(function() { edelweiss_singer.start(4); });
    $('.piano-la').click(function() { edelweiss_singer.start(5); });
    $('.piano-si').click(function() { edelweiss_singer.start(6); });
    $('.piano-highdo').click(function() { edelweiss_singer.start(7); });
    $('.piano-highre').click(function() { edelweiss_singer.start(8); });
    $('.piano-highmi').click(function() { edelweiss_singer.start(9); });

    //sing-note from network
    socket.on('sing-note', function(note) {
	console.log(note);
	switch(note) {
	case '/C4':
	    edelweiss_singer.start(0);
	    break;
	case '/D4':
	    edelweiss_singer.start(1);
	    break;
	case '/E4':
	    edelweiss_singer.start(2);
	    break;
	case '/F4':
	    edelweiss_singer.start(3);
	    break;
	case '/G4':
	    edelweiss_singer.start(4);
	    break;
	case '/A4':
	    edelweiss_singer.start(5);
	    break;
	case '/B4':
	    edelweiss_singer.start(6);
	    break;
	case '/C5':
	    edelweiss_singer.start(7);
	    break;
	case '/D5':
	    edelweiss_singer.start(8);
	    break;
	case '/E5':
	    edelweiss_singer.start(9);
	    break;
	default:
	    ;
	}
    });

    socket.on('sing-note', function(note) {
	console.log(note);
	switch(note) {
	case '/C4':
	    edelweiss_singer.start(0);
	    break;
	case '/D4':
	    edelweiss_singer.start(1);
	    break;
	case '/E4':
	    edelweiss_singer.start(2);
	    break;
	case '/F4':
	    edelweiss_singer.start(3);
	    break;
	case '/G4':
	    edelweiss_singer.start(4);
	    break;
	case '/A4':
	    edelweiss_singer.start(5);
	    break;
	case '/B4':
	    edelweiss_singer.start(6);
	    break;
	case '/C5':
	    edelweiss_singer.start(7);
	    break;
	case '/D5':
	    edelweiss_singer.start(8);
	    break;
	case '/E5':
	    edelweiss_singer.start(9);
	    break;
	default:
	    ;
	}
    });

    //sndcheck audio
    $('.ui-clap').click(function() {
        clap.start();
    });
    
    //update system status
    socket.on('schedule', function(stat) {
        console.log(stat.prog);
	// resyncClock(stat.ctime); //re-syncronize clock
	// var now = getTimeNow(); //get server time

	//
	scheduler = function(prog) { prog.start(); };
	
	//// manage programs
	
	//
        if (stat.prog == 'carhorn')     { scheduler(carhorn);    $('#program').text('경적'); }
        if (stat.prog == 'carhorn-mix') { scheduler(carhornmix); $('#program').text('경적Mix'); }
        if (stat.prog == 'phone')       { scheduler(phone);      $('#program').text('전화'); }
        if (stat.prog == 'phone-mix')   { scheduler(phonemix);   $('#program').text('전화Mix'); }
        if (stat.prog == 'cricket')     { scheduler(cricket);    $('#program').text('귀뚜라미'); }
        if (stat.prog == 'train')       { scheduler(train);      $('#program').text('기차'); }
        if (stat.prog == 'brassball')   { scheduler(brassball);  $('#program').text('브라스와 공'); }
        if (stat.prog == 'sea')         { scheduler(sea);        $('#program').text('바다'); }
        if (stat.prog == 'trk01')       { scheduler(trk01);      $('#program').text('track-01'); }
        if (stat.prog == 'watcher')     { scheduler(watcher);    $('#program').text('관객'); }
        if (stat.prog == 'machine')     { scheduler(machine);    $('#program').text('기계'); }
        if (stat.prog == 'bee')         { scheduler(bee);        $('#program').text('벌떼'); }
        if (stat.prog == 'tuba')        { scheduler(tuba);       $('#program').text('투바'); }
        if (stat.prog == 'bell')        { scheduler(bell);       $('#program').text('종'); }
	
	// stop all!!
	else if (stat.prog == 'wait') {
            //announcements
            count.stop();
            clap.stop();
	}
    });

    var indi_timeout;
    $('#playbtn').click(function() {
        if (indi.state == "started") {
            indi.stop();
            clearInterval(indi_timeout);
        }
        indi.start();
        $(this).find('.play').hide();
        $(this).find('.stop').show();
        indi_timeout = setInterval(function() {
            if (indi.state == "stopped") {
                $(this).find('.stop').hide();
                $(this).find('.play').show();
                clearInterval(indi_timeout);
                console.log(2);
            }
        }.bind(this), 500);
    });
    $('#playbtn .play').show();
    $('#playbtn .stop').hide();

});
