//// collect motion data!!!

var g_tiltsx;
var g_tiltsy;
var g_accelx;
var g_accely;
var g_accelz;
var g_gyroy;
var g_gyror;
var g_gyrop;
var g_motiony;
var g_motionr;
var g_motionp;

var g_sensed = 0;
var g_sensed_array_slow_first = true;
var g_sensed_array_slow = [];
var g_sensed_array_fast = [];
var g_sensed_mavg_slow = 0;
var g_sensed_mavg_fast = 0;

var args = {
	// frequency:50,			// ( How often the object sends the values - milliseconds )
	frequency:20,			// ( How often the object sends the values - milliseconds )
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
	var rawaccelx = g_accelx = data.dm.gx/9.8; // -1 ~ 1
	var rawaccely = g_accely = data.dm.gy/9.8; // -1 ~ 1
	var rawaccelz = g_accelz = data.dm.gz/9.8; // -1 ~ 1

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
	
	g_gyroy = data.dm.alpha; //deg/s
	g_gyror = data.dm.beta; //deg/s
	g_gyrop = data.dm.gamma; //deg/s

	g_motiony = data.do.alpha/180-1; //-1 ~ 1 : yaw : -1 == north pole
	g_motionp = data.do.beta/180; //-1 ~ 1 : pitch
	g_motionr = data.do.gamma/90; //-1 ~ 1 : roll

	////  cooking... shaker motion detecting signal..
	// var sensed = g_tiltsx;
	var sensed = g_tiltsy;
	g_sensed = sensed;
	
	//moving average
	if (g_sensed_array_slow_first == true) {
	    g_sensed_array_slow.push(sensed);
	    if (g_sensed_array_slow.length > 100) {
		g_sensed_array_slow.shift();
		g_sensed_array_slow_first = false;
	    }
	    var sum_slow = 0;
	    for (var idx = 0; idx < g_sensed_array_slow.length; idx++) {
		sum_slow = sum_slow + g_sensed_array_slow[idx];
	    }
	    g_sensed_mavg_slow = sum_slow/g_sensed_array_slow.length;
	}
	
	g_sensed_array_fast.push(sensed);
	if (g_sensed_array_fast.length > 3) g_sensed_array_fast.shift();
	var sum_fast = 0;
	for (var idx = 0; idx < g_sensed_array_fast.length; idx++) {
	    sum_fast = sum_fast + g_sensed_array_fast[idx];
	}
	g_sensed_mavg_fast = sum_fast/g_sensed_array_fast.length;
    });
}).catch(function(e){
    // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
});




	// var sensed = g_tiltsy;

	// // if (sensed > 0 && sensed_prev <= 0) { //rising edge event
	// if (sensed > 0 && sensed_prev <= 0) { //rising edge event
	//     osc.frequency.value = Math.random()*1400 + 200;
	//     ampEnv.triggerAttackRelease(0.3);
	// }

	// //get mavg 50, out of first 100 values
	// if (sensed_array_first > 0) {
	//     sensed_array_first--;
	    
	//     if (sensed_array_idx < 50) {
	// 	sensed_array.push(sensed);
	// 	sensed_array_idx++;
	//     }
	//     else {
	// 	sensed_array_idx = 0;
	//     }

	//     var sum = 0;
	//     sensed_array.forEach(function(item){sum += item;});
	    
	// }
	// else { // calib. done. start playing
	//     ;
	// }





//
//cooking accel to tilts @ mobmuplat (android/java)
// --> https://github.com/monkeyswarm/MobMuPlat/blob/master/MobMuPlat-Android/app/src/main/java/com/iglesiaintermedia/mobmuplat/MainActivity.java#L1093
//

// private void cookAccel(float[] rawAccel, float outputAccel[]) { //input is -10 to 10, inverted on x
// 	//assumes in 3, out 2
// 	float cookedX = rawAccel[0];
// 	float cookedY = rawAccel[1];
// 	float accelZ = rawAccel[2];
// 	// cook it via Z accel to see when we have tipped it beyond 90 degrees

// 	if(cookedX>0 && accelZ>0) cookedX=(2-cookedX); //tip towards long side
// 	else if(cookedX<0 && accelZ>0) cookedX=(-2-cookedX); //tip away long side

// 	if(cookedY>0 && accelZ>0) cookedY=(2-cookedY); //tip right
// 	else if(cookedY<0 && accelZ>0) cookedY=(-2-cookedY); //tip left

// 	//clip 
// 	if(cookedX<-1)cookedX=-1;
// 	else if(cookedX>1)cookedX=1;
// 	if(cookedY<-1)cookedY=-1;
// 	else if(cookedY>1)cookedY=1;
// 	//return new float[]{cookedX, cookedY};
// 	outputAccel[0] = cookedX;
// 	outputAccel[1] = cookedY;
// }

$( document ).ready(function() {

    ////ui utilities
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
    // animationStripes

    $('.ui-tgl-disco').change(function() {
	if ($(this).prop('checked') == true) {
	    $(this).removeClass('bg-near-black').addClass('bg-white');
	}
	else {
	    $(this).removeClass('bg-white').addClass('bg-near-black');
	}
    });

    //// audio    
    var ampEnv = new Tone.AmplitudeEnvelope({
    	"attack": 0.1,
    	"decay": 0.3,
    	"sustain": 0,
    	"release": 0
    }).toMaster();
    
    var osc = new Tone.Oscillator(440, "sine").connect(ampEnv);
    osc.start();
    
    //// audio data loading
    var boo = new Tone.MultiPlayer(
	[
	    "audio/boobab@3/01.wav",
	    "audio/boobab@3/02.wav",
	    "audio/boobab@3/03.wav"
	]
    ).toMaster();

    // sound enabler (for iOS)
    $(".touch").click(function() {
	boo.start(0);
	osc.start();
    });

    //
    var state = "released";
    var motionupdater = setInterval(function() {

	// var sensed_inst = g_sensed_mavg_fast - g_sensed_mavg_slow;
	var sensed_inst = g_sensed;

	//threshold~ 0 10 -0.8 100
	if (state == "released") {
	    if (sensed_inst > 0) {
		//bang
		osc.frequency.value = Math.random()*1400 + 200;
		ampEnv.triggerAttackRelease(0.4);
		// boo.playbackRate = (Math.random()-0.5)*0.5+1;
		boo.start(Math.floor(Math.random()*3)+1);
		state = "engaged";
	    }
	}
	else if (state == "engaged") {
	    if (sensed_inst < -0.2) {
		//nothing
		state = "released";
	    }
	}
	
    }, 50);
});
