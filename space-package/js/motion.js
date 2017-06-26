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

//NEW IDEA : let's loosen criteria to trigger any jerky motion. and then, decide what to do according to *filtered* motionr/motionp at that moment!
var g_posep = 0;
var g_poser = 0;
function motionprocessing (motioncallback) {

    // motion sensing.
    var sensed = 0;
    var state = 0; //0 : ready, 1: tringgering, 2: triggered
    var holdcnt = 0;
    var sum = 0;
    var mavg_motionp = new Mavg(2);
    // var mavg_motionr = new Mavg(20);
    var mavg_motionr = new Mavg(5);
    var mavg_tiltsy = new Mavg(20);
    var motioncapture = setInterval(function() {

	// //integral
    	// sum = sum + Math.abs(g_accelx + g_accely + g_accelz);

	// //mavgs for drift canceling
	// mavg_slow.push(sum);
	// mavg_fast.push(sum);

	// //growing case only
	// sensed = Math.abs(mavg_fast.get() - mavg_slow.get());

	//any jerky motion!!
	sensed = Math.abs(g_accelx) + Math.abs(g_accely) + Math.abs(g_accelz);

	mavg_motionp.push(Math.abs(g_motionp));
	mavg_motionr.push(Math.abs(g_motionr));
	mavg_tiltsy.push(Math.abs(g_tiltsy));
	g_posep = mavg_motionp.get(); //nice to check front/back
	g_poser = mavg_motionr.get(); //nice to check upright/flat
	g_posey = mavg_tiltsy.get(); //nice to check upright/flat
	
    	//thresholding emulation. bang/freeze/ready again.
    	if (state == 0) { //ready
    	    if (sensed > 3) {
    		//bang!!
    		motioncallback(g_poser, g_posep, g_posey);
    		state = 1; //triggering
    		holdcnt = 7;
    	    }
    	}
    	else if (state == 1) { //triggering
    	    holdcnt = holdcnt - 1;
    	    if (holdcnt <= 0) {
    		state = 2; //triggered
    	    }
    	}
    	else if (state == 2) { //triggered
	    // if (sensed < 3) { //comment out this to allow re-triggering!! --> more pleasure.
    	    state = 0; //ready
	    // }
    	}

    }, 50);
}
