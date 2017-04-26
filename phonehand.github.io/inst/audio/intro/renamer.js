//
// a shuffle & renaming node.js script.
//

// care to be taken, filename conflicts..
// otherwise.. conflict some and fails!!

// method 1 - didn't work..
// method 2 - works.
// methid 3 - didn't really try.. shows how to extend this script 'arg' abled!

//shuffle algorithm
//==>http://stackoverflow.com/a/2450976
function shuffle(array) { 
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
    }

    return array;
}

//put actual filename!! - but rename to be sth. different names!! --> so, this could be better not 'renaming' but 'rename & copy into a new folder'!
var originoriginfilename = [
    '01.mp3',
    '02.mp3',
    '03.mp3',
    '04.mp3',
    '05.mp3',
    '06.mp3',
    '07.mp3',
    '08.mp3',
    '09.mp3',
    '10.mp3',
    '11.mp3',
    '12.mp3',
    '13.mp3',
    '14.mp3',
    '15.mp3',
    '16.mp3',
    '17.mp3',
    '18.mp3',
    '19.mp3',
    '20.mp3',
    '21.mp3',
    '22.mp3',
    '23.mp3',
    '24.mp3',
    '25.mp3',
    '26.mp3',
    '27.mp3',
    '28.mp3',
    '29.mp3',
    '30.mp3'
];

//and target names from originoriginfilenames!! --> shuffle!!
newfilename = shuffle(originoriginfilename);



//current filenames, that we (should) have now!!
var originfilename = [
    'n01.mp3',
    'n02.mp3',
    'n03.mp3',
    'n04.mp3',
    'n05.mp3',
    'n06.mp3',
    'n07.mp3',
    'n08.mp3',
    'n09.mp3',
    'n10.mp3',
    'n11.mp3',
    'n12.mp3',
    'n13.mp3',
    'n14.mp3',
    'n15.mp3',
    'n16.mp3',
    'n17.mp3',
    'n18.mp3',
    'n19.mp3',
    'n20.mp3',
    'n21.mp3',
    'n22.mp3',
    'n23.mp3',
    'n24.mp3',
    'n25.mp3',
    'n26.mp3',
    'n27.mp3',
    'n28.mp3',
    'n29.mp3',
    'n30.mp3'
];

console.log(newfilename);

// // method 1
// var fs = require('fs');
// for (var i = 0; i < originfilename.length; i++) {
//     fs.rename(originfilename[i], newfilename[i], function(err) {
// 	if ( err ) console.log('ERROR: ' + err);
//     });
// }

// method 2
const shell = require('child_process').execSync;

for (var i = 0; i < originfilename.length; i++) {
    var origin = originfilename[i];
    var change = newfilename[i];
    shell(`mv ${origin} ${change}`);
}

// // method 3
// var fs = require('fs'),
//     path = require('path'),
//     args = process.argv.slice(2),
//     dir = args[0];

// files = fs.readdirSync(dir);

// console.log(files);

