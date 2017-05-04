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
    if (Math.random() < 0.4) { edelweiss_mode = 'band'; } // band is 40%

    if (edelweiss_mode == 'band') {
	url = "audio/edelweiss/band@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
	var edelweiss_band = new Howl({ src: url, html5: false });
    }
    else if (edelweiss_mode == 'singer') {
	url = "audio/edelweiss/voice@9/" + Math.floor(Math.random()*9+1) + "/";
	var edelweiss_singer = [
	    new Howl({ src: url + "do.mp3", html5: false }),
	    new Howl({ src: url + "re.mp3", html5: false }),
	    new Howl({ src: url + "mi.mp3", html5: false }),
	    new Howl({ src: url + "fa.mp3", html5: false }),
	    new Howl({ src: url + "sol.mp3", html5: false }),
	    new Howl({ src: url + "la.mp3", html5: false }),
	    new Howl({ src: url + "si.mp3", html5: false }),
	    new Howl({ src: url + "highdo.mp3", html5: false }),
	    new Howl({ src: url + "highre.mp3", html5: false }),
	    new Howl({ src: url + "highmi.mp3", html5: false })
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
    var clap = new Howl({ src: url, html5: false });
    //
    url = "audio/54321.mp3";
    var count = new Howl({ src: url, html5: false });
    //
    url = "audio/bee@8/" + ("0" + Math.floor(Math.random()*8+1)).slice(-2) + ".mp3";
    var bee = new Howl({ src: url, html5: false });
    //
    url = "audio/brassball@9/" + ("0" + Math.floor(Math.random()*9+1)).slice(-2) + ".mp3";
    var brassball = new Howl({ src: url, html5: false });
    //
    url = "audio/car-horn@10/" + ("0" + Math.floor(Math.random()*10+1)).slice(-2) + ".mp3";
    var carhorn = new Howl({ src: url, html5: false });
    //
    url = "audio/cricket@30/" + ("0" + Math.floor(Math.random()*30+1)).slice(-2) + ".mp3";
    var cricket = new Howl({ src: url, html5: false });
    //
    url = "audio/machine@13/" + ("0" + Math.floor(Math.random()*13+1)).slice(-2) + ".mp3";
    var machine = new Howl({ src: url, html5: false });
    //
    url = "audio/phone@10/" + ("0" + Math.floor(Math.random()*10+1)).slice(-2) + ".mp3";
    var phone = new Howl({ src: url, html5: false });
    //
    url = "audio/sea@15/" + ("0" + Math.floor(Math.random()*15+1)).slice(-2) + ".mp3";
    var sea = new Howl({ src: url, html5: false });
    //
    url = "audio/train@1/" + ("0" + Math.floor(Math.random()*1+1)).slice(-2) + ".mp3";
    var train = new Howl({ src: url, html5: false });
    //
    url = "audio/trk01@30/" + ("0" + Math.floor(Math.random()*30+1)).slice(-2) + ".mp3";
    var trk01 = new Howl({ src: url, html5: false });
    //
    url = "audio/watcher@5/" + ("0" + Math.floor(Math.random()*5+1)).slice(-2) + ".mp3";
    var watcher = new Howl({ src: url, html5: false });
    //
    url = "audio/tuba@7/" + ("0" + Math.floor(Math.random()*7+1)).slice(-2) + ".mp3";
    var tuba = new Howl({ src: url, html5: false });
    //
    url = "audio/bell@3/" + ("0" + Math.floor(Math.random()*3+1)).slice(-2) + ".mp3";
    var bell = new Howl({ src: url, html5: false });

    //announcements
    url = "audio/clap.wav";         var clap         = new Howl({ src: url, html5: false });
    url = "audio/54321.mp3";        var count        = new Howl({ src: url, html5: false });
    url = "audio/10meg.mp3";        var meg10        = new Howl({ src: url, html5: false });
    url = "audio/ansanintro.mp3";   var ansanintro   = new Howl({ src: url, html5: false });
    url = "audio/citizenintro.mp3"; var citizenintro = new Howl({ src: url, html5: false });
    url = "audio/clap.wav";         var clap         = new Howl({ src: url, html5: false });
    url = "audio/enablespk.mp3";    var enablespk    = new Howl({ src: url, html5: false });
    url = "audio/enablespk-w.mp3";  var enablespk_w  = new Howl({ src: url, html5: false });
    url = "audio/maxvol-d.mp3";     var maxvol_d     = new Howl({ src: url, html5: false });
    url = "audio/maxvol-w.mp3";     var maxvol_w     = new Howl({ src: url, html5: false });
    url = "audio/playhelp.mp3";     var playhelp     = new Howl({ src: url, html5: false });
    url = "audio/spkon.mp3";        var spkon        = new Howl({ src: url, html5: false });
    url = "audio/spkon-slow.mp3";   var spkon_slow   = new Howl({ src: url, html5: false });
    url = "audio/spkon-w.mp3";      var spkon_w      = new Howl({ src: url, html5: false });
    url = "audio/trybutton-w.mp3";  var trybutton_w  = new Howl({ src: url, html5: false });
    url = "audio/webpage2-w.mp3";   var webpage2_w   = new Howl({ src: url, html5: false });
    url = "audio/webpage-w.mp3";    var webpage_w    = new Howl({ src: url, html5: false });

    //sndcheck audio
    $('.ui-clap').click(function() {
        clap.play();
    });
    
    //net msg.
    socket.on('54321',        function() { count.play(); });
    socket.on('10meg',        function() { meg10.play(); });
    socket.on('ansanintro',   function() { ansanintro.play(); });
    socket.on('citizenintro', function() { citizenintro.play(); });
    socket.on('clap',         function() { clap.play(); });
    socket.on('enablespk',    function() { enablespk.play(); });
    socket.on('enablespk-w',  function() { enablespk_w.play(); });
    socket.on('maxvol-d',     function() { maxvol_d.play(); });
    socket.on('maxvol-w',     function() { maxvol_w.play(); });
    socket.on('playhelp',     function() { playhelp.play(); });
    socket.on('spkon',        function() { spkon.play(); });
    socket.on('spkon-slow',   function() { spkon_slow.play(); });
    socket.on('spkon-w',      function() { spkon_w.play(); });
    socket.on('trybutton-w',  function() { trybutton_w.play(); });
    socket.on('webpage2-w',   function() { webpage2_w.play(); });
    socket.on('webpage-w',    function() { webpage_w.play(); });

    //update system status
    socket.on('schedule', function(stat) {
        // // console.log(stat);
	// resyncClock(stat.ctime); //re-syncronize clock
	// var now = getTimeNow(); //get server time

	//
	scheduler = function(prog) { prog.play(); };
	
	//// manage programs
	
	//
        if (stat.prog == 'carhorn')   { scheduler(carhorn);   $('#program').text('경적'); }
        if (stat.prog == 'phone')     { scheduler(phone);     $('#program').text('전화'); }
        if (stat.prog == 'cricket')   { scheduler(cricket);   $('#program').text('귀뚜라미'); }
        if (stat.prog == 'train')     { scheduler(train);     $('#program').text('기차'); }
        if (stat.prog == 'brassball') { scheduler(brassball); $('#program').text('브라스와 공'); }
        if (stat.prog == 'sea')       { scheduler(sea);       $('#program').text('바다'); }
        if (stat.prog == 'trk01')     { scheduler(trk01);     $('#program').text('track-01'); }
        if (stat.prog == 'watcher')   { scheduler(watcher);   $('#program').text('관객'); }
        if (stat.prog == 'machine')   { scheduler(machine);   $('#program').text('기계'); }
        if (stat.prog == 'bee')       { scheduler(bee);       $('#program').text('벌떼'); }
        if (stat.prog == 'tuba')      { scheduler(tuba);      $('#program').text('투바'); }
        if (stat.prog == 'bell')      { scheduler(bell);      $('#program').text('종'); }
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
            //announcements
            count.stop();
            meg10.stop();
            ansanintro.stop();
            citizenintro.stop();
            clap.stop();
            enablespk.stop();
            enablespk_w.stop();
            maxvol_d.stop();
            maxvol_w.stop();
            stophelp.stop();
            spkon.stop();
            spkon_slow.stop();
            spkon_w.stop();
            trybutton_w.stop();
            webpage2_w.stop();
            webpage_w.stop();
	    tuba.stop();
	    bell.stop();

	    //
            carhorn.stop();
            phone.stop();
            cricket.stop();
            train.stop();
            brassball.stop();
            sea.stop();
            trk01.stop();
            watcher.stop();
	    machine.stop();
	    bee.stop();
	    if (edelweiss_mode == 'band') {
		edelweiss_band.stop();
	    }
	    $('#program').text('-');
	}

    });
});
