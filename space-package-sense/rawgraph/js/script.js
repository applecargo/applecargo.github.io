//// collect motion data!!!

var g_tiltsx = 0;
var g_tiltsy = 0;
var g_accelx = 0;
var g_accely = 0;
var g_accelz = 0;
var g_gyroy = 0;
var g_gyror = 0;
var g_gyrop = 0;
var g_motiony = 0;
var g_motionr = 0;
var g_motionp = 0;

var args = {
    frequency:50,			// ( How often the object sends the values - milliseconds )
    gravityNormalized:true,		// ( If the gravity related values to be normalized )
    orientationBase:GyroNorm.GAME,	// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
    decimalCount:2,			// ( How many digits after the decimal point will there be in the return values )
    logger:null,			// ( Function to be called to log messages from gyronorm.js )
    screenAdjusted:true		// ( If set to true it will return screen adjusted values. )
};

var gn = new GyroNorm();

gn.init(args).then(function(){
    gn.start(function(data){
	// Process:
	// data.do.alpha	( deviceorientation event alpha value )
	// data.do.beta		( deviceorientation event beta value )
	// data.do.gamma	( deviceorientation event gamma value )
	// data.do.absolute	( deviceorientation event absolute value )

	// data.dm.x		( devicemotion event acceleration x value )
	// data.dm.y		( devicemotion event acceleration y value )
	// data.dm.z		( devicemotion event acceleration z value )

	// data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
	// data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
	// data.dm.gz		( devicemotion event accelerationIncludingGravity z value )

	// data.dm.alpha	( devicemotion event rotationRate alpha value )
	// data.dm.beta		( devicemotion event rotationRate beta value )
	// data.dm.gamma	( devicemotion event rotationRate gamma value )

	var rawaccelx = data.dm.gx/9.8; // -1 ~ 1
	var rawaccely = data.dm.gy/9.8; // -1 ~ 1
	var rawaccelz = data.dm.gz/9.8; // -1 ~ 1

	//cook accel to get more close 'tilts' as mobmuplat's tilts
	var cookedx = rawaccelx;
	var cookedy = rawaccely;

	if (cookedx>0 && rawaccelz>0) cookedx = (2-cookedx);
	else if (cookedx<0 && rawaccelz>0) cookedx = (-2-cookedx);
	
	if (cookedy>0 && rawaccelz>0) cookedy = (2-cookedy);
	else if (cookedy<0 && rawaccelz>0) cookedy = (-2-cookedy);

	if (cookedx<-1) cookedx = -1;
	else if (cookedx>1) cookedx = 1;

	if (cookedy<-1) cookedy = -1;
	else if (cookedy>1) cookedy = 1;
	
	g_tiltsx = cookedx;
	g_tiltsy = cookedy;
	
	g_accelx = data.dm.x/9.8; // -1 ~ 1
	g_accely = data.dm.y/9.8; // -1 ~ 1
	g_accelz = data.dm.z/9.8; // -1 ~ 1
	
	g_gyroy = data.dm.alpha; //deg/s
	g_gyror = data.dm.beta; //deg/s
	g_gyrop = data.dm.gamma; //deg/s

	g_motiony = data.do.alpha/180-1; //-1 ~ 1 : yaw : -1 == north pole
	g_motionp = data.do.beta/180; //-1 ~ 1 : pitch
	g_motionr = data.do.gamma/90; //-1 ~ 1 : roll
    });
}).catch(function(e){
    // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
});

function arrayMin(arr) {
    var len = arr.length, min = Infinity;
    while (len--) {
	if (Number(arr[len]) < min) {
	    min = Number(arr[len]);
	}
    }
    return min;
};

function arrayMax(arr) {
    var len = arr.length, max = -Infinity;
    while (len--) {
	if (Number(arr[len]) > max) {
	    max = Number(arr[len]);
	}
    }
    return max;
};

$( document ).ready(function() {

    //ui
    $('.ui-tgl-capture').change(function() {
    	if ($(this).prop('checked') == true) {
    	    $(this).removeClass('bg-navy').addClass('bg-yellow');
    	}
    	else {
    	    $(this).removeClass('bg-yellow').addClass('bg-navy');
    	}
    });
    $('.ui-tgl-capture').prop('checked', true).change();
    
    //
    var ws_tiltsx = new Webscope($(".ws_tiltsx")[0], -1, 1, 300);
    var ws_tiltsy = new Webscope($(".ws_tiltsy")[0], -1, 1, 300);
    var ws_accelx = new Webscope($(".ws_accelx")[0], -1, 1, 300);
    var ws_accely = new Webscope($(".ws_accely")[0], -1, 1, 300);
    var ws_accelz = new Webscope($(".ws_accelz")[0], -1, 1, 300);
    var ws_gyroy = new Webscope($(".ws_gyroy")[0], -1, 1, 300);
    var ws_gyror = new Webscope($(".ws_gyror")[0], -1, 1, 300);
    var ws_gyrop = new Webscope($(".ws_gyrop")[0], -1, 1, 300);
    var ws_motiony = new Webscope($(".ws_motiony")[0], -1, 1, 300);
    var ws_motionr = new Webscope($(".ws_motionr")[0], -1, 1, 300);
    var ws_motionp = new Webscope($(".ws_motionp")[0], -1, 1, 300);

    //
    var capture_running = 1;
    var motioncapture = setInterval(function() {

	if (capture_running == 1) {

	    ws_tiltsx.update(g_tiltsx);//SCOPE
	    ws_tiltsy.update(g_tiltsy);//SCOPE
	    ws_accelx.update(g_accelx);//SCOPE
	    ws_accely.update(g_accely);//SCOPE
	    ws_accelz.update(g_accelz);//SCOPE
	    ws_gyroy.update(g_gyroy);//SCOPE
	    ws_gyror.update(g_gyror);//SCOPE
	    ws_gyrop.update(g_gyrop);//SCOPE
	    ws_motiony.update(g_motiony);//SCOPE
	    ws_motionr.update(g_motionr);//SCOPE
	    ws_motionp.update(g_motionp);//SCOPE
	    
	}
	
    }, 50);

    $('.ui-tgl-capture').click(function() {
	capture_running = $(this).prop('checked');
    });

});
